const ru = {
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
        ERR_NETWORK: 'Ошибка соединения',
        unknownError: 'Ошибка соединения',
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
      toast: {
        fetchError: 'Ошибка соединения'
      }
    },
    yupErrors: {
      channelNameIsDuplicated: 'Канал с таким именем уже создан',
      channelNameLength: 'От 3 до 20 символов',
      minSymbols: {
        key_one: 'Не менее {{count}} символ',
        key_few: 'Не менее {{count}} символа',
        key_many: 'Не менее {{count}} символов',
      },
      maxSymbols: {
        key_one: 'Не более {{count}} символ',
        key_few: 'Не более {{count}} символа',
        key_many: 'Не более {{count}} символов',
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
        add: 'Канал создан',
        remove: 'Канал удален',
        rename: 'Канал переименован',
        unknownError: 'Ошибка соединения',
      },
    },
    socketErrors: {
      timeout: 'Ожидаемое время выполнения операции истекло. Проверьте наличие сети или повторите попытку позднее',
    },
  },
};

export default ru;
