package pl.spring.demo.mapper;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import pl.spring.demo.entity.AuthorEntity;
import pl.spring.demo.entity.BookEntity;
import pl.spring.demo.to.BookTo;

public class BookMapper {

	public static BookTo map(BookEntity bookEntity) {
		if (bookEntity != null) {
			return new BookTo(bookEntity.getId(), bookEntity.getTitle(), mapAuthors(bookEntity.getAuthors()));
		}
		return null;
	}

	public static BookEntity map(BookTo bookTo) {
		if (bookTo != null) {
			return new BookEntity(bookTo.getId(), bookTo.getTitle(), mapAuthors(bookTo.getAuthors()));
		}
		return null;
	}

	public static List<BookTo> map2To(List<BookEntity> bookEntities) {
		return bookEntities.stream().map(BookMapper::map).collect(Collectors.toList());
	}

	public static List<BookEntity> map2Entity(List<BookTo> bookEntities) {
		return bookEntities.stream().map(BookMapper::map).collect(Collectors.toList());
	}

	private static String mapAuthors(Collection<AuthorEntity> authors) {
		if (!authors.isEmpty()) {
			return authors.stream().map(authorEntity -> authorEntity.getFirstName() + " " + authorEntity.getLastName())
					.collect(Collectors.joining(", "));
		}
		return null;
	}

	private static Set<AuthorEntity> mapAuthors(String authors) {
		Set<AuthorEntity> authorEntities = new HashSet<AuthorEntity>();
		String[] author = authors.split(", ");
		for (int i = 0; i < author.length; i++) {
			authorEntities.add(new AuthorEntity(author[i].split(" ")[0], author[i].split(" ")[1]));
		}
		return authorEntities;
	}
}