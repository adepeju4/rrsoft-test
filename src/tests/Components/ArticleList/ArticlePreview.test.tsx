import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ArticlePreview from "../../../Components/ArticleList/ArticlePreview";

export const mockArticle = {
  id: "1",
  contentType: "blog",
  title: "Test Article",
  author: "test_author",
  articleRef: "article-1",
  attorneyName: "John Doe",
  attorneyEmail: "john.doe@example.com",
  content: "This is a test article content.",
  tags: ["react", "javascript", "testing"],
  userId: "123",
};

describe("ArticlePreview", () => {
  it("renders the article title, content, tags, and author", () => {
    render(<ArticlePreview item={mockArticle} />);

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test article content."),
    ).toBeInTheDocument();
    mockArticle.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
    expect(screen.getByText(/Author: @test_author/)).toBeInTheDocument();
  });
});
