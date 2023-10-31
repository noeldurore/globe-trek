/**
 * filename: sophisticated_code.js
 * 
 * This code demonstrates a sophisticated and elaborate JavaScript implementation
 * of a bookstore library management system, complete with multiple classes,
 * inheritance, and complex functionality.
 */
 
// Book class to represent a book
class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }
  
  displayBookInfo() {
    console.log('---------------------');
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Publication Year: ${this.publicationYear}`);
    console.log('---------------------');
  }
}

// FictionBook class extends Book class
class FictionBook extends Book {
  constructor(title, author, publicationYear, genre) {
    super(title, author, publicationYear);
    this.genre = genre;
  }
  
  displayBookInfo() {
    super.displayBookInfo();
    console.log(`Genre: ${this.genre}`);
    console.log('---------------------');
  }
}

// NonFictionBook class extends Book class
class NonFictionBook extends Book {
  constructor(title, author, publicationYear, topic) {
    super(title, author, publicationYear);
    this.topic = topic;
  }
  
  displayBookInfo() {
    super.displayBookInfo();
    console.log(`Topic: ${this.topic}`);
    console.log('---------------------');
  }
}

// Library class to manage books
class Library {
  constructor() {
    this.books = [];
  }
  
  addBook(book) {
    this.books.push(book);
  }
  
  displayBooks() {
    console.log('*** Library Books ***');
    for (let book of this.books) {
      book.displayBookInfo();
    }
  }
}

// Create books
const fiction1 = new FictionBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Novel');
const fiction2 = new FictionBook('To Kill a Mockingbird', 'Harper Lee', 1960, 'Coming-of-Age Fiction');
const nonFiction1 = new NonFictionBook('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 2011, 'History');
const nonFiction2 = new NonFictionBook('Thinking, Fast and Slow', 'Daniel Kahneman', 2011, 'Psychology');

// Create a library object
const library = new Library();

// Add books to the library
library.addBook(fiction1);
library.addBook(fiction2);
library.addBook(nonFiction1);
library.addBook(nonFiction2);

// Display all books in the library
library.displayBooks();