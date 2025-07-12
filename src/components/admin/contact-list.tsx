
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { formatDistanceToNow } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Contact } from "@/lib/types";

export function ContactList() {
    const { data, contacts: { updateItem, deleteItem } } = usePortfolioData();
    const { toast } = useToast();

    const handleMarkAsRead = (contact: Contact) => {
        if (!contact.read) {
            updateItem({ ...contact, read: true });
        }
    };

    const handleDelete = (id: string) => {
        deleteItem(id);
        toast({
            title: "Message Deleted",
            description: "The contact message has been removed.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Messages sent through your contact form.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Received</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.contacts.map((contact) => (
                            <TableRow key={contact.id} className={!contact.read ? 'bg-secondary/50' : ''}>
                                <TableCell>
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell className="max-w-sm truncate">{contact.message}</TableCell>
                                <TableCell>
                                    {formatDistanceToNow(new Date(contact.received), { addSuffix: true })}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={contact.read ? 'secondary' : 'default'}>{contact.read ? 'Read' : 'New'}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {
                                                !contact.read && (
                                                    <DropdownMenuItem onClick={() => handleMarkAsRead(contact)}>
                                                        <Eye className="mr-2 h-4 w-4" /> Mark as read
                                                    </DropdownMenuItem>
                                                )
                                            }
                                            <DropdownMenuItem onClick={() => handleDelete(contact.id!)} className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                         {data?.contacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                    No contact messages yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
