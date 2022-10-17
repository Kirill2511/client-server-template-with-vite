import React, { FC } from 'react'
import { StaticLayout } from '../../components/StaticLayout/StaticLayout'
import './HowToPlayPage.scss'

export const HowToPlay: FC = () => {
  return (
    <div className="rules">
      <StaticLayout>
        <h3 className="rules__header">Как играть</h3>
        <div className="rules__text">
          <article>
            <p dir="auto">
              <strong>1. Игровое поле и фигуры</strong>
            </p>
            <p dir="auto">
              Игровое поле - "стакан" размером 10 х 20 клеток. 7 видов фигур,
              каждая из четырех "кубиков", размер кубика 1х1 клетка:
            </p>
            <ul dir="auto">
              <li>"линия",</li>
              <li>"кубик",</li>
              <li>"треугольник",</li>
              <li>"Г-образная фигура",</li>
              <li>"L-образная фигура",</li>
              <li>"S-образная фигура" ,</li>
              <li>
                "<em>г</em>-образная фигура". Фигуры различаются по цветам.
              </li>
            </ul>
            <p dir="auto">
              <strong>2. Цели игры</strong>
            </p>
            <p dir="auto">
              Цель игры - набрать как можно больше очков, совмещая фигуры таким
              образом, чтобы "кубики" образовали горизонтальную линию (заполнили
              ряд). Заполненный ряд исчезает.
            </p>
            <p dir="auto">
              <strong>3. Игровой процесс</strong>
            </p>
            <p dir="auto">
              В процессе игры игрок управляет выпадающими фигурами, составляя из
              них заполненные ряды.
              <br />
              Следующая фигура определяется рандомизатором.
              <br />
              Фигуры "выпадают" из центра стакана.
              <br />
              Скорость падения фигуры определяется уровнем. Скорость на уровне 0
              составляет 1 сек/клетка.
              <br />
              Фигура считается установленной, если она после окончания цикла
              перемещения касается нижележащей фигуры или дна "стакана".
              <br />
              После установки фигуры производится оценка заполненности рядов,
              заполненные ряды удаляются, производится подсчет линий, очков,
              прибавление уровня в случае выполнения условий.
              <br />
              Следующая фигура появляется после того, как текущая фигура
              установлена.
            </p>
            <p dir="auto">
              <strong>4. Условия игры и подсчет очков</strong>
            </p>
            <p dir="auto">
              Очки начисляются за заполненные ряды в зависимости от уровня и
              количества одновременно заполненных рядов:
            </p>
            <table>
              <thead>
                <tr>
                  <th>
                    <strong>Уровень</strong>
                  </th>
                  <th>
                    <strong>1 ряд</strong>
                  </th>
                  <th>
                    <strong>2 ряда</strong>
                  </th>
                  <th>
                    <strong>3 ряда</strong>
                  </th>
                  <th>
                    <strong>4 ряда</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>40</td>
                  <td>100</td>
                  <td>300</td>
                  <td>1200</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>80</td>
                  <td>200</td>
                  <td>600</td>
                  <td>2400</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>120</td>
                  <td>300</td>
                  <td>900</td>
                  <td>3600</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>400</td>
                  <td>1000</td>
                  <td>3000</td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>n</td>
                  <td>40 * (n + 1)</td>
                  <td>100 * (n + 1)</td>
                  <td>300 * (n + 1)</td>
                  <td>1200 * (n + 1)</td>
                </tr>
              </tbody>
            </table>
            <p dir="auto">
              Уровень увеличивается через каждые 10 заполненных рядов.
              Увеличение уровня означает умножение скорости падения фигур на 1.2
            </p>
            <p dir="auto">
              <strong>5. Управление</strong>
            </p>
            <p dir="auto">Управление движением фигур осуществляется</p>
            <ul dir="auto">
              <li>
                (для десктопной версии) стрелками клавиатуры + пробел либо
                кнопками WASD + пробел,
              </li>
              <li>
                (для мобильной версии) контролами на экране, имитирующими
                стрелки и кнопку пробела.
                <br />
                Игру можно поставить на паузу, в этом случае на экран выводится
                сообщение о том, что игра на паузе, и кнопка запуска игры.
                <br />
                Можно начать новую игру. При нажатии на соответствующую кнопку
                на экран выводится сообщение "Завершить игру?", после
                подтверждения текущая игра завершается, статистика игрока
                отправляется в лидерборд, статистика обнуляется, "стакан"
                очищается, игра начинается с начала.
              </li>
            </ul>
            <p dir="auto">
              Стрелка вверх (клавиша W) - поворот фигуры на 90 гр по часовой
              стрелке;
              <br />
              Стрелки влево, вправо (клавиши A, D) - перемещение фигуры на одну
              клетку в заданном направлении (долгое нажатие - перемещение в
              заданном направлении до отпускания кнопки или касания края
              "стакана");
              <br />
              Стрелка вниз (клавиша S) - принудительное перемещение фигуры на
              одну клетку вниз (долгое нажатие - ускоренное падение);
              <br />
              Пробел - моментальное падение.
            </p>
            <p dir="auto">
              <strong>6. Стартовые условия</strong>
            </p>
            <p dir="auto">
              На старте у игрока есть пустой "стакан", информация о следующей
              фигуре, нулевая статистика по параметрам:
            </p>
            <ul dir="auto">
              <li>количество очков</li>
              <li>уровень</li>
              <li>
                количество линий Игра начинается с уровня 0 после нажатия на
                кнопку "начать игру".
              </li>
            </ul>
            <p dir="auto">
              <strong>7. Окончание игры</strong>
            </p>
            <p dir="auto">
              Игра заканчивается, когда фигура нижним краем "стоит" на других
              фигурах, а верхним краем касается или выходит за край "стакана"
              (т.е. "стакан заполнен"). Статистика игрока отдается в лидерборд,
              на экран выводится сообщение об окончании игры и предложение
              начать новую игру.
            </p>
          </article>
        </div>
      </StaticLayout>
    </div>
  )
}
