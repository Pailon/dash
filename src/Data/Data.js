// const prep = {
//     first_name: 'Anton',
//     second_name: 'Tolsticov',
//     num: '8-800-555-35-55',
//     old: '999',
//     email: 'Anton@mail.ru',
//     stepen: 'Doctor',
//     zvanie: 'Profeccor',
//     doljnost: 'ROP',
//     rpd: true,
//   }
//   const prep = {
//     first_name: 'Иван',
//     second_name: 'Иванович',
//     num: '8-800-555-55-35',
//     old: '111',
//     email: 'Ivan@mail.ru',
//     stepen: 'Кандидат в доктора наук',
//     zvanie: 'Доцент',
//     doljnost: 'Преподаватель',
//     rpd: true,
//   }


export const Prep = [
    {id:121,
    id_person:1111,// id в персоналити
    position:'rector',
    id_rank:'professor',
    id_degree:1,//СТепень
    rate:1,//Ставка 
    hours_worked:1,
    RINC:1,
    web_of_science:1, //?
    scopus:1,//Это скопус, неизвестно
    login:1,
    password:1,
    salt:1 //е нужно, это соль
    },
    {id:122,
      id_person:1112,
      position:'rector2',
      id_rank:'professor2',
      id_degree:1,
      rate:1,
      hours_worked:1,
      RINC:1,
      web_of_science:1,
      scopus:1,
      login:1,
      password:1,
      salt:1
      },
    {id:123,
        id_person:1113,
        position:'rector3',
        id_rank:'professor3',
        id_degree:1,
        rate:1,
        hours_worked:1,
        RINC:1,
        web_of_science:1,
        scopus:1,
        login:1,
        password:1,
        salt:1
        }
  ]

  export const Rpd_data = [

    {
      id:1,
      file:1,
      date:1,
      id_teacher:1,
    }

  ]

  export const Pd_data = [
  {
      id:0,
      title:'Веб-студия',
      id_file:123,
      description:'Создать игру Веб-студия',
      start:'01.01.1998',
      end:'01.01.2020',
      link_trello:'trello.com/mylink/12355',
      id_sub_unit:'ВЕБ'
    },

    {
      id:1,
      title:'Субмарина',
      id_file:123,
      description:'Спроектировать субмарину для погружения под воду',
      start:'01.01.1991',
      end:'01.01.2010',
      link_trello:'trello.com/mylink/123334',
      id_sub_unit:'САПР'
    },

    {
      id:2,
      title:'Ровер для луны',
      id_file:123,
      description:'Спроектировать ровер для освоения луны',
      start:'01.01.1000',
      end:'01.01.2000',
      link_trello:'trello.com/mylink/44231',
      id_sub_unit:'МашСтрой'
    },
  ]

  export const File_proj_act = [
    {    
      id:1,
    file:1,
    date:1
    }

  ]

  export const Student = [
  {
      id:1,
      id_person:1,
      id_group:1,
      id_proj_act:1
    }
  ]

  // export const Personalities = [
  //     {id:0,
  //     name:'Евгений',
  //     surname:'Осокин',
  //     patronymic:'Алексеевич',// Отчество
  //     birthday:'01.01.1000',
  //     phone:'+79919999999',
  //     email:'ter1@ya.ru',
  //     status:1// Преподаватель - 1 Студент - 2
  //     },
  //     {id:1,
  //       name:'Алексей',
  //       surname:'Тремаскин',
  //       patronymic:'Владимирович',
  //       birthday:'29.02.2000',
  //       phone:'+79929999999',
  //       email:'ter2@ya.ru',
  //       status:1
  //       },
  //     {id:2,
  //         name:'Алина',
  //         surname:'Борзикова',
  //         patronymic:'Александровка',
  //         birthday:'31.12.3000',
  //         phone:'+79939999999',
  //         email:'ter3@ya.ru',
  //         status:1
  //         }
  // ]

  export const discip = {
    name: 'Физика',
    lr: '111',
    lek: '111',
    exam: '1'
  }


  export const Personalities = [
    {
      "id": 3,
      "id_person": 3,
      "position": "Junior",
      "id_rank": 5,
      "id_degree": 5,
      "rate": 0.25,
      "hours_worked": 300,
      "RINC": 0.1,
      "id_ind_plan": 5,
      "web_of_science": 0.1,
      "scopus": 0.1,
      "login": "shnurok",
      "password": "$2b$12$piimRf83sMCpGqKNMu69yudE/KNk/8W2KqO41s5hOVKRkg4RZgeaK",
      "salt": null,
      "name": "Alexander",
      "surname": "Buravov",
      "patronymic": "Nikolaevich",
      "birthday": "1998-10-24T20:00:00.000Z",
      "phone": "8(926)213-12-33",
      "email": "sh@mail.ru",
      "status": 1
    }
  ]



  