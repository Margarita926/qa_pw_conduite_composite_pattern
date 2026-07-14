import {test} from '../../_fixtures/fixtures';

test(`Create new comment without auth token`, async ({
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
    null,
  );

  await commentsApi.assertUnauthorizedResponseCode(commentResponse);
});