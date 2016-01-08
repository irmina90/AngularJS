package pl.spring.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import pl.spring.demo.entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

	@Query("select book from BookEntity book where upper(book.title) like concat(upper(:title), '%')")
	public List<BookEntity> findBookByTitle(@Param("title") String title);

	@Query("select book from BookEntity book JOIN book.authors author where upper(author.firstName) like concat('%', upper(:author), '%') or upper(author.lastName) like concat('%', upper(:author), '%')")
	public List<BookEntity> findBookByAuthor(@Param("author") String author);
	
	@Modifying
	@Query("update BookEntity book SET book.title=:title WHERE book.id=:id")
	public void updateBookTitle(@Param("id") Long id, @Param("title") String author);
}