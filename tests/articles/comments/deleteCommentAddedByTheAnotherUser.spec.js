import {test} from '../../_fixtures/fixtures';

test(`Delete comment added by the another user`, async ({
  registeredUser,
  articlesApi,
  commentsApi,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;

  const response = await articlesApi.createArticle(
    article,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  const comment = {
    body: 'This is a comment',
  };

  const commentResponse = await commentsApi.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );
   await commentsApi.assertSuccessResponseCode(commentResponse);

  const DeleteCommentResponse = await commentsApi.deleteComment(
    (await response.json()).article.slug,
    (await commentResponse.json()).comment.id,
    registeredUser.token,
  );

  await commentsApi.assertNoContentResponseCode(DeleteCommentResponse);
});