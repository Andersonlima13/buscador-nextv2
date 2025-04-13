"use client"

import { List, Datagrid, TextField, ReferenceArrayField, WithListContext } from 'react-admin';
import { Chip, Stack } from '@mui/material';

export default function ListAdm() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map(book => (
                        <TableRow key={book.id}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>
                                <Stack direction="row" spacing={1}>
                                    {book.tags.map(tag => (
                                        <Chip key={tag.id} label={tag.name} />
                                    ))}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
      );
    }