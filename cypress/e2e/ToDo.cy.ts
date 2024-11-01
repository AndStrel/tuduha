describe('Проверяем работоспособность списка задач', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080')
	})

	it('Добавление новой задачи', () => {
		// Шаг 1: Находим контейнер ввода задачи
		const taskText = 'Новая задача'

		cy.get('[data-cy="task-input"]').as('taskInput') // Находим поле ввода задачи
		cy.get('@taskInput').should('exist') // Проверяем, что поле ввода задачи существует

		// Шаг 2: Проверяем, что список задач отсутствует или пустой
		cy.get('[data-cy="task-list"]').contains('Бездельничаем') // Проверка, что до добавления задач нет

		// Шаг 3: Вводим задачу в поле и нажимаем кнопку "Добавить"
		cy.get('@taskInput').type(taskText) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"

		// Шаг 4: Проверяем, что задача добавилась в список
		cy.get('[data-cy="task-list"]').should('exist') // Проверка, что список задач появился
		cy.get('[data-cy="task-list"]').should('contain', taskText) // Проверка, что в списке есть наша новая задача
	})

	it('Удаление задачи', () => {
		// Шаг 1: Добавляем задачу
		const taskText = 'Новая задача'
		cy.get('[data-cy="task-input"]').type(taskText) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"

		// Шаг 2: Проверяем, что задача добавилась в список
		cy.get('[data-cy="task-list"]').should('exist') // Проверка, что список задач появился
		cy.get('[data-cy="task-list"]').should('contain', taskText) // Проверка, что в списке есть наша новая задача

		// Шаг 3: Удаляем задачу
		cy.get('[data-cy="task-item"]')
			.first()
			.find('[data-cy="delete-button"]')
			.click() // Нажимаем на кнопку "Удалить"

		// Шаг 4: Проверяем, что задача удалена из списка
		cy.get('[data-cy="task-list"]').contains('Бездельничаем') // Проверка, что список задач больше нет
	})

	it('Отмечаем задачу как выполненную', () => {
		const taskText = 'Новая задача'

		// Добавляем задачу
		cy.get('[data-cy="task-input"]').type(taskText)
		cy.get('[data-cy="add-button"]').click()

		// Проверяем, что задача добавлена
		cy.get('[data-cy="task-list"]').should('contain', taskText)

		// Отмечаем задачу как выполненную, проверяя наличие класса Mui-checked
		cy.get('[data-cy="task-item"]')
			.first()
			.find('[data-cy="task-checkbox"]')
			.click()

		// Проверяем, что чекбокс имеет класс Mui-checked
		cy.get('[data-cy="task-item"]')
			.first()
			.find('[data-cy="task-checkbox"]')
			.should('have.class', 'Mui-checked') // Проверка по классу, а не по состоянию 'checked'

		// Дополнительно проверяем, что текст задачи зачёркнут
		cy.get('[data-cy="task-item"]')
			.first()
			.find('[data-cy="task-text"]')
			.should('have.css', 'text-decoration-line', 'line-through')
	})

	it('фильтруем задачи', () => {
		// Шаг 1: Добавляем задачу
		const tasks = [
			'Новая задача',
			'Новая задача 2',
			'Новая задача 3',
			'Новая задача 4',
		]

		cy.get('[data-cy="task-input"]').type(tasks[0]) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"
		cy.get('[data-cy="task-input"]').type(tasks[1]) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"
		cy.get('[data-cy="task-input"]').type(tasks[2]) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"
		cy.get('[data-cy="task-input"]').type(tasks[3]) // Ввод текста задачи
		cy.get('[data-cy="add-button"]').click() // Нажимаем на кнопку "Добавить"

		// Шаг 2: Проверяем, что задачи добавились в список
		cy.get('[data-cy="task-list"]').should('exist') // Проверка, что список задач появился
		cy.get('[data-cy="task-item"]').should('have.length', 4)

		// Шаг 3: Отмечаем задачу как выполненную
		cy.get('[data-cy="task-item"]')
			.eq(2)
			.find('[data-cy="task-checkbox"]')
			.click() // Нажимаем на чекбокса

		// Проверяем, что чекбокс имеет класс Mui-checked
		cy.get('[data-cy="task-item"]')
			.eq(2)
			.find('[data-cy="task-checkbox"]')
			.should('have.class', 'Mui-checked') // Проверка по классу, а не по состоянию 'checked'

		// Дополнительно проверяем, что текст задачи зачёркнут
		cy.get('[data-cy="task-item"]')
			.eq(2)
			.find('[data-cy="task-text"]')
			.should('have.css', 'text-decoration-line', 'line-through')

		// Шаг 5: Проверяем что вывполненная задача находится в списке
		cy.get('[data-cy="all-filter"]').click() // Нажимаем на кнопку "все "
		cy.get('[data-cy="task-item"]').should('have.length', 4)
		cy.get('[data-cy="active-filter"]').click() // Нажимаем на кнопку "акитвные "
		cy.get('[data-cy="task-item"]').should('have.length', 3)
		cy.get('[data-cy="completed-filter"]').click() // Нажимаем на кнопку "выполненные "
		cy.get('[data-cy="task-item"]').should('have.length', 1)
		cy.get('[data-cy="task-item"]').contains(tasks[2]) // Проверка, что в списке есть наша новая задача

		// Шаг 6: Удаляем задачу
		cy.get('[data-cy="task-item"]')
			.first()
			.find('[data-cy="delete-button"]')
			.click() // Нажимаем на кнопку "Удалить"

		// Шаг 7: Проверяем, что задача удалена из списка
		cy.get('[data-cy="task-list"]').contains('Бездельничаем') // Проверка, что список задач пустой и там написано "Бездельничаем"
		cy.get('[data-cy="all-filter"]').click() // Нажимаем на кнопку "все "
		cy.get('[data-cy="task-item"]').should('have.length', 3)
		cy.get('[data-cy="task-item"]').not(tasks[2])

		// Шаг 8: отмечаем все задачи как выполненные
		cy.get('[data-cy="task-item"]')
			.eq(0)
			.find('[data-cy="task-checkbox"]')
			.click()
		cy.get('[data-cy="task-item"]')
			.eq(1)
			.find('[data-cy="task-checkbox"]')
			.click()
		cy.get('[data-cy="task-item"]')
			.eq(2)
			.find('[data-cy="task-checkbox"]')
			.click()

		// Шаг 9: удаляем выполненые задачи
		cy.get('[data-cy="clear-button"]').click()

		// Шаг 10: Проверяем, что все задачи удалены
		cy.get('[data-cy="task-list"]').contains('Бездельничаем')
		cy.get('[data-cy="task-item"]').should('have.length', 0)
	})
})
