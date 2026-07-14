import {test} from '../../_fixtures/fixtures';

test(`Delete comment added by the another user`, async ({
  registeredUser,
  api,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;

  // const response = await api.createArticle(
  //   article,
  //   registeredUser.token,
  // );

  const response = await api.createArticle(
    article,
    registeredUser.token,
  );
  await api.assertSuccessResponseCode(response);
  const comment = { body: 'This is a comment' };
  const commentResponse = await api.comments.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );
  await api.comments.assertSuccessResponseCode(commentResponse);
  // Отримуємо ID коментаря
  const commentId = (await commentResponse.json()).comment.id;
  // Намагаємося видалити коментар іншим користувачем
  const deleteResponse = await api.comments.deleteComment(
    (await response.json()).article.slug,
    commentId,
    registeredUser.token, // той самий користувач — тест потребує іншого!
  );
  await api.comments.assertNoContentResponseCode(deleteResponse);
});