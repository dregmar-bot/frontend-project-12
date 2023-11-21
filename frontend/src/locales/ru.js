export default {
  translation: {
    loginPage: {
      loginForm: {
        username: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
      },
      loginCardFooter: {
        haveNoAccount: 'Нет аккаунта?',
        registration: 'Регистрация',
      },
      errors: {
        ERR_BAD_REQUEST: 'Неверные имя пользователя или пароль',
        ERR_BAD_RESPONSE: 'Ошибка сети. Попробуйте позже',
      }
    },
    pageNotFound: {
      pageNotFound: 'Страница не найдена',
      youCanGo: 'Но вы можете перейти',
      toMainPage: 'на главную страницу',
    },
    chatPage: {
      channelBox: {
        channels: 'Каналы',
        remove: 'Удалить',
        rename: 'Переименовать',

      },
      messagesBox: {
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      }
    },
    yupErrors: {
      channelNameIsDuplicated: 'Канал с таким именем уже создан',
    },
    modals: {
      channelModal: {
        add: 'Добавить канал',
        rename: 'Переименовать канал',
        channelName: 'Имя канала',
        cancel: 'Отменить',
        submit: 'Отправить',
        sending: 'Отправка...',
      },
      removeChannelModal: {
        removeChannel: 'Удалить канал',
        areYouSure: 'Вы уверены?',
        remove: 'Удалить',
        cancel: 'Отменить',
      }
    },
  },
};
