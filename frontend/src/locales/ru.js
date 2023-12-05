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
        ERR_NETWORK: 'Ошибка сети',
        unknownError: 'Неизвестная ошибка. Повторите позднее',
      }
    },
    pageNotFound: {
      pageNotFound: 'Страница не найдена',
      youCanGo: 'Но вы можете перейти',
      toMainPage: 'на главную страницу',
    },
    signupPage: {
      signupCard: {
        signup: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        register: 'Зарегистрироваться',
        confirmPassword: 'Подтвердите пароль',
      },
      errors: {
        ERR_BAD_REQUEST: 'Пользователь с таким именем уже зарегистрирован',
        ERR_NETWORK: 'Ошибка сети',
        unknownError: 'Неизвестная ошибка. Повторите позднее',
      }
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
      },
    },
    yupErrors: {
      channelNameIsDuplicated: 'Канал с таким именем уже создан',
      minSymbols: {
        key_one: 'Минимум {{count}} символ',
        key_few: 'Минимум {{count}} символа',
        key_many: 'Минимум {{count}} символов',
      },
      maxSymbols: {
        key_one: 'Максимум {{count}} символ',
        key_few: 'Максимум {{count}} символа',
        key_many: 'Максимум {{count}} символов',
      },
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
      },
      toast: {
        add: 'Канал успешно создан',
        remove: 'Канал успешно удален',
        rename: 'Канал успешно переименован',
        unknownError: 'Произошла ошибка. Повторите позднее',
      },
    },
    socketErrors: {
      timeout: 'Ожидаемое время выполнения операции истекло. Проверьте наличие сети или повторите попытку позднее',
    },
  },
};
