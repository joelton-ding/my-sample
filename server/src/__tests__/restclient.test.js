import { RestClient, Endpoint, RestSettings } from '../fmk/restclient'

// jest.setTimeout(30000);

const apis = {
  env: 'GET /todos/env',
  todos: 'get /todos/',
  todosFindbyOwner: 'GET /todos/findTodos?ownerName={ownerName}',
  todosCreate: 'POST /todos',
  todosUpdate: 'PUT /todos/{id}',
  todosDelete: 'DELETE /todos/{id}'
}

beforeAll(() => {
  RestSettings.api_host = 'localhost'
  RestSettings.api_port = 5000
  RestSettings.api_prefix = ''
  RestSettings.debug = false
})

describe('RestClient', function() {
  test('hello world', () => {
    expect(1).toBe(1)
  })

  test('get env', async () => {
    expect.assertions(1)

    const data = (await RestClient.call(Endpoint(apis.env))).data
    expect(data).toEqual(expect.stringMatching(/Hello/gi))
  })

  test('get all todos', done => {
    RestClient.call(Endpoint(apis.todos)).then(res => {
      expect(res.data).not.toBeNull()
      done()
    })
  })

  test('find todos', done => {
    RestClient.call(
      Endpoint(apis.todosFindbyOwner, { ownerName: 'daodao' })
    ).then(res => {
      expect(res.data).not.toBeNull()
      done()
    })
  })

  test('create todos', async () => {
    expect.assertions(1)
    const data = (await RestClient.call(Endpoint(apis.todosCreate), null, {
      todo: 'just a test',
      ownerName: 'daodao'
    })).data
    expect(data.ownerName).toBe('daodao')
  })

  test('create todos - validation', async () => {
    expect.assertions(1)
    const data = (await RestClient.call(Endpoint(apis.todosCreate), null, {
      todo: 'just a test'
    })).data
    // ownerName is required
    expect(data.fields).toContain('ownerName')
  })

  test('update todos', async () => {
    expect.assertions(1)

    let data = (await RestClient.call(Endpoint(apis.todosFindbyOwner), {
      ownerName: 'daodao'
    })).data
    data = (await RestClient.call(
      Endpoint(apis.todosUpdate),
      {
        id: data[0].id
      },
      {
        todo: 'update test',
        ownerName: 'daodao'
      }
    )).data
    expect(data.todo).toBe('update test')
  })

  test('delete todos', async () => {
    expect.assertions(1)

    let data = (await RestClient.call(Endpoint(apis.todosFindbyOwner), {
      ownerName: 'daodao'
    })).data

    return RestClient.call(Endpoint(apis.todosDelete), {
      id: data[0].id
    }).catch(err => {
      expect(err.response.status).toBe(500)
    })
  })
})
