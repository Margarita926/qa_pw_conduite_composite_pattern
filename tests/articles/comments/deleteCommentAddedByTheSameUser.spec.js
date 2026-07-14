import {test} from '../../_fixtures/fixtures';

test(`Delete comment added by the the same user`, async ({
  registeredUser,
  articlesApi,
  commentsApi,
  articleWithoutTags,
}) => {
    
  const article = articleWithoutTags;

  const response = await articlesApi.createArticle(article, registeredUser.token);
  await articlesApi.assertSuccessResponseCode(response);

    const commentResponse = await commentsApi.createComment(
    (await response.json()).article.slug,
    { body: 'This is a comment' },
    registeredUser.token,
  );
  await commentsApi.assertSuccessResponseCode(commentResponse);

  const deleteResponse = await commentsApi.deleteComment(
    (await response.json()).article.slug,
    (await commentResponse.json()).comment.id,
    registeredUser.token,
  );
  await commentsApi.assertNoContentResponseCode(deleteResponse);
});