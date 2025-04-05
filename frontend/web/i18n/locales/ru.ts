export default defineI18nLocale(async () => {
  return {
    navigation: {
      homepage: 'Главная',
      advancedSearch: 'Расширенный поиск',
      profile: 'Профиль',
      bookings: 'Мои бронирования',
      logout: 'Выйти',
      login: 'Войти',
    },
    common: {
      active: 'Активный',
      inactive: 'Неактивный',
      closed: 'Закрыто',
    },
    weekdays: {
      monday: 'Понедельник',
      tuesday: 'Вторник',
      wednesday: 'Среда',
      thursday: 'Четверг',
      friday: 'Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье',
    },
    error: {
      404: {
        title: 'Страница не найдена',
        description: 'Извините, страница, которую вы ищете, не существует.',
      },
      500: {
        title: 'Внутренняя ошибка сервера',
        description: 'Извините, на сервере произошла ошибка. Пожалуйста, попробуйте позже.',
      },
      401: {
        title: 'Не авторизован',
        description: 'Извините, вы не авторизованы для доступа к этой странице.',
      },
    },
    button: {
      go_home: 'Вернуться на главную',
    },
  };
});
