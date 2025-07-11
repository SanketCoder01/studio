
'use client';
import { useState } from 'react';
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { Education } from '@/lib/types';
import { EducationForm } from '@/components/admin/forms/education-form';

export function EducationList() {
    const { data, education: { deleteItem, addItem, updateItem } } = usePortfolioData();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Education | undefined>(undefined);

    const handleDelete = (id: string) => {
        deleteItem(id);
        toast({
            title: "Education Entry Deleted",
            description: "The education entry has been removed from your portfolio.",
        });
    };
    
    const handleEdit = (item: Education) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setSelectedItem(undefined);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (values: Omit<Education, 'id'> | Education) => {
        if ('id' in values) {
            await updateItem(values);
            toast({ title: 'Education Updated', description: 'Your education entry has been updated.' });
        } else {
            await addItem(values);
            toast({ title: 'Education Added', description: 'A new education entry has been added.' });
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Education</CardTitle>
                            <CardDescription>Manage your educational background.</CardDescription>
                        </div>
                        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add Entry</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>School</TableHead>
                                <TableHead>Degree</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.education.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.school}</TableCell>
                                    <TableCell>{item.degree}</TableCell>
                                    <TableCell>{item.period}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(item.id!)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <EducationForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleFormSubmit}
                initialData={selectedItem}
            />
        </>
    )
}
