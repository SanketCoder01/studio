
'use client';
import { useState } from 'react';
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { Internship } from '@/lib/types';
import { InternshipForm } from '@/components/admin/forms/internship-form';

export function InternshipsList() {
    const { data, internships: { deleteItem, addItem, updateItem } } = usePortfolioData();
    const { toast } = useToast();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Internship | undefined>(undefined);

    const handleDelete = (id: string) => {
        deleteItem(id);
        toast({
            title: "Internship Deleted",
            description: "The internship has been removed from your portfolio.",
        });
    };

    const handleEdit = (item: Internship) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setSelectedItem(undefined);
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (values: Omit<Internship, 'id'> | Internship) => {
        if ('id' in values) {
            await updateItem(values);
            toast({ title: 'Internship Updated', description: 'Your internship has been updated.' });
        } else {
            await addItem(values);
            toast({ title: 'Internship Added', description: 'A new internship has been added.' });
        }
        setIsFormOpen(false);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Internships</CardTitle>
                            <CardDescription>Manage your internship experiences.</CardDescription>
                        </div>
                        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add Internship</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.internships.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.company}</TableCell>
                                    <TableCell>{item.role}</TableCell>
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
            <InternshipForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleFormSubmit}
                initialData={selectedItem}
            />
        </>
    )
}
