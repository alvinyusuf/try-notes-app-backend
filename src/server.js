const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  const noteService = new NotesService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: noteService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
  // const server = Hapi.server({
  //   port: 5000,
  //   host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  //   routes: {
  //       cors: {
  //           origin: ['*']
  //       }
  //   }
  // });

  // server.route(routes);

  // await server.start();
  // console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
