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
        authorizationError: 'Неверные имя пользователя или пароль',
        networkError: 'Ошибка сети',
        undefinedError: 'Неизвестная ошибка. Повторите позднее',
      },
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
        signupError: 'Пользователь с таким именем уже зарегистрирован',
        networkError: 'Ошибка соединения',
        undefinedError: 'Ошибка соединения',
      },
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
        fetchError: 'Ошибка соединения',
      },
    },
    yupErrors: {
      channelNameIsDuplicated: 'Канал с таким именем уже создан',
      minSymbols: 'От {{count}}',
      maxSymbols: {
        key_one: 'до {{count}} символа',
        key_few: 'до {{count}} символов',
        key_many: 'до {{count}} символов',
      },
      passwordLengthMin: 'Не менее 6 символов',
      passwordLengthMax: 'Не более 50 символов',
      passwordMismatch: 'Пароли должны совпадать',
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
        remove: 'Канал удалён',
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
