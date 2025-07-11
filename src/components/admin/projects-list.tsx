
'use client';
import { useState } from 'react';
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { Project } from '@/lib/types';
import { ProjectForm } from '@/components/admin/forms/project-form';

export function ProjectsList() {
    const { data, projects: { deleteItem, addItem, updateItem } } = usePortfolioData();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Project | undefined>(undefined);

    const handleDelete = (id: string) => {
        deleteItem(id);
        toast({
            title: "Project Deleted",
            description: "The project has been removed from your portfolio.",
        });
    }

    const handleEdit = (item: Project) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setSelectedItem(undefined);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (values: Omit<Project, 'id'> | Project) => {
        if ('id' in values) {
            await updateItem(values);
            toast({ title: 'Project Updated', description: 'Your project has been updated.' });
        } else {
            await addItem(values);
            toast({ title: 'Project Added', description: 'A new project has been added.' });
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>Manage your projects. Add new ones or edit existing entries.</CardDescription>
                        </div>
                        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell className="max-w-md truncate">{project.description}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(project)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(project.id!)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <ProjectForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleFormSubmit}
                initialData={selectedItem}
            />
        </>
    )
}
