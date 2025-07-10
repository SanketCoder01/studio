'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockContacts = [
    { id: 1, name: 'Jane Doe', email: 'jane.d@example.com', message: "Loved your projects! Let's connect.", received: '2 days ago', read: false },
    { id: 2, name: 'John Smith', email: 'j.smith@corp.com', message: 'Inquiry about a potential collaboration.', received: '5 days ago', read: true },
];

export function ContactList() {
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockContacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell className="max-w-sm truncate">{contact.message}</TableCell>
                                <TableCell>{contact.received}</TableCell>
                                <TableCell>
                                    <Badge variant={contact.read ? 'secondary' : 'default'}>{contact.read ? 'Read' : 'New'}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
