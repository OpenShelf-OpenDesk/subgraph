import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import { BookPublished } from "../generated/Publisher/Publisher";
import { Book, BookMetaData } from "../generated/schema";
import { Book as BookContract } from "../generated/templates";

export function handleBookPublished(event: BookPublished): void {
  let book = Book.load(event.params.bookId.toString());
  if (!book) {
    let context = new DataSourceContext();
    context.setString("bookId", event.params.bookId.toString());
    BookContract.createWithContext(event.params.bookAddress, context);
    let newBook = new Book(event.params.bookId.toString());
    newBook.metadataUri = event.params.metadataUri.toString();
    newBook.coverPageUri = event.params.coverPageUri.toString();
    newBook.price = event.params.price;
    newBook.royalty = event.params.royalty;
    newBook.edition = event.params.edition;
    newBook.prequel = event.params.prequel;
    newBook.supplyLimited = event.params.supplyLimited;
    newBook.pricedBookSupplyLimit = event.params.pricedBookSupplyLimit;
    newBook.publishedOn = event.block.timestamp;
    newBook.totalRevenue = new BigInt(0);
    newBook.withdrawableRevenue = new BigInt(0);
    newBook.pricedBooksPrinted = new BigInt(0);
    newBook.freeBooksPrinted = new BigInt(0);
    newBook.contributors = [];
    newBook.save();
  }
}

// remining IPFS
