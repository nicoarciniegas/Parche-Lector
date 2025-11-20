package com.parchelector.repository;

import com.parchelector.model.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Book entity.
 * 
 * @author Nicolas Arciniegas
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    Optional<Book> findByIsbn13(String isbn13);

    List<Book> findByPublishedYear(Integer year);
}
