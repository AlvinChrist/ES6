const { nanoid } = require('nanoid');
const bookshelf = require('./books');

const saveBook = (request, h) => {
    const postedBook = request.payload;

    if (postedBook.name !== '' && postedBook.name !== undefined) {
        if (postedBook.readPage <= postedBook.pageCount) {
            const id = nanoid(16);
            const finished = postedBook.pageCount === postedBook.readPage;
            const insertedAt = new Date().toISOString();
            const updatedAt = insertedAt;
            const newBook = {
                id, ...postedBook, finished, insertedAt, updatedAt,
            };
            bookshelf.push(newBook);

            const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
            if (isSuccess) {
                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil ditambahkan',
                    data: {
                        bookId: id,
                    },
                });
                response.code(201);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
            });
            response.code(500);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
};

const getAllBooks = (request) => {
    const paramlist = request.query;
    if ('name' in paramlist) {
        const filterName = paramlist.name.toLowerCase();
        const books = bookshelf.filter(({ name }) => name.toLowerCase().includes(filterName))
                      .map(({ id, name, publisher }) => ({ id, name, publisher }));
        return {
            status: 'success',
            data: {
                books,
            },
        };
    }
    if ('reading' in paramlist) {
        const books = bookshelf.filter(({ reading }) => reading == paramlist.reading)
                      .map(({ id, name, publisher }) => ({ id, name, publisher }));
        return {
            status: 'success',
            data: {
                books,
            },
        };
    }
    if ('finished' in paramlist) {
        const books = bookshelf.filter(({ finished }) => finished == paramlist.finished)
                      .map(({ id, name, publisher }) => ({ id, name, publisher }));
        return {
            status: 'success',
            data: {
                books,
            },
        };
    }
    const books = bookshelf.map(({ id, name, publisher }) => ({ id, name, publisher }));
    return {
        status: 'success',
        data: {
            books,
        },
    };
};

const getBookById = (request, h) => {
    const { id } = request.params;
    const book = bookshelf.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookById = (request, h) => {
    const { id } = request.params;
    const index = bookshelf.findIndex((book) => book.id === id);
    const newBook = request.payload;
    if (index !== -1) {
        if (newBook.name !== '' && newBook.name !== undefined) {
            if (newBook.readPage <= newBook.pageCount) {
                const updatedAt = new Date().toISOString();
                bookshelf[index] = {
                    ...bookshelf[index],
                    ...newBook,
                    updatedAt,
                };

                const response = h.response({
                    status: 'success',
                    message: 'Buku berhasil diperbarui',
                });
                response.code(200);
                return response;
            }

            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookById = (request, h) => {
    const { id } = request.params;
    const index = bookshelf.findIndex((book) => book.id === id);
    if (index !== -1) {
        bookshelf.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
                saveBook,
                getAllBooks,
                getBookById,
                editBookById,
                deleteBookById,
                };
