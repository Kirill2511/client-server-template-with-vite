import { dbConnect, User } from './../config/db.config'
import type { IUser } from './../models/user'

// Создание пользователя
export async function createUser(
  firstName: string,
  secondName: string,
  userID: number,
  displayName: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
) {
  return User.create({
    firstName,
    secondName,
    userID,
    displayName,
    login,
    email,
    phone,
    avatar,
  })
}

// Обновление пользователя по ID
export async function updateUserById(id: number, data: IUser) {
  return User.update(data, { where: { id } })
}

// Удаление пользователя по ID
export async function deleteUserById(id: number) {
  return User.destroy({ where: { id } })
}

// Получение пользователя по ID
export async function getUserById(id: number) {
  return User.findOne({ where: { id } })
}

// Получение пользователей по имени
export async function getUsersByFirstName(firstName: string) {
  return User.findAll({ where: { firstName } })
}

// Поиск пользователей по никнейму
export async function getUsersByDisplayName(displayName: string) {
  return User.findAll({ where: { displayName } })
}

// Получение всех пользователей
export async function getAllUsers() {
  return User.findAll()
}

// Удалить всех пользователей
export async function deleteAllUsers() {
  return User.destroy({
    where: {},
    truncate: false,
  })
}

export function startApp() {
  dbConnect().then()
  /*
   * Запуск приложения только после старта БД


  // Создаем нового пользователя
  await createUser('Alex', 'Ivanov')
  // Получаем пользователей с именем Alex
  const users = await getUsersByFirstName('Alex')

  // Проверяем, найдены ли пользователи
  if (!users.length) {
    throw 'Not found'
  }

  // Получаем id первого пользователя
  const { id } = users[0]
  // Обновляем пользователя по ID
  await updateUserById(id, { firstName: 'Ivan', lastName: 'Ivanov' })

  // Ищем обновленного пользователя по id
  const findedUser = await getUserById(id)
  // Выводим в консоль найденного пользователя
  console.log('Finded user: ', findedUser)
})
*/
}