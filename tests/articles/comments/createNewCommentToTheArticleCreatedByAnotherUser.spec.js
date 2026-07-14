import {test} from '../../_fixtures/fixtures';

test(`Create new comment to the article created by another user`, async ({
  registeredUser,
  api,
  commentsApi,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;

  const response = await api.createArticle(
    article,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  const comment = {
    body: 'This is a comment',
  };

  const commentResponse = await commentsApi.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );

  await commentsApi.assertSuccessResponseCode(commentResponse);
});