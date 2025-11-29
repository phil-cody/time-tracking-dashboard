const timeTrackingData = [
	{
		'title': 'Work',
		'timeframes': {
			'daily': {
				'current': 5,
				'previous': 7
			},
			'weekly': {
				'current': 32,
				'previous': 36
			},
			'monthly': {
				'current': 103,
				'previous': 128
			}
		}
	},
	{
		'title': 'Play',
		'timeframes': {
			'daily': {
				'current': 1,
				'previous': 2
			},
			'weekly': {
				'current': 10,
				'previous': 8
			},
			'monthly': {
				'current': 23,
				'previous': 29
			}
		}
	},
	{
		'title': 'Study',
		'timeframes': {
			'daily': {
				'current': 0,
				'previous': 1
			},
			'weekly': {
				'current': 4,
				'previous': 7
			},
			'monthly': {
				'current': 13,
				'previous': 19
			}
		}
	},
	{
		'title': 'Exercise',
		'timeframes': {
			'daily': {
				'current': 1,
				'previous': 1
			},
			'weekly': {
				'current': 4,
				'previous': 5
			},
			'monthly': {
				'current': 11,
				'previous': 18,
			}
		}
	},
	{
		'title': 'Social',
		'timeframes': {
			'daily': {
				'current': 1,
				'previous': 3
			},
			'weekly': {
				'current': 5,
				'previous': 10
			},
			'monthly': {
				'current': 21,
				'previous': 23
			}
		}
	},
	{
		'title': 'Self Care',
		'timeframes': {
			'daily': {
				'current': 0,
				'previous': 1
			},
			'weekly': {
				'current': 2,
				'previous': 2
			},
			'monthly': {
				'current': 7,
				'previous': 11
			}
		}
	}
]

function showDateForPeriod(period) {
	// Перебираем все активности из данных
	timeTrackingData.forEach(activity => {
		// Находим карточку с соответствующим data-title
		const card = document.querySelector(`[data-title="${activity.title}"]`);
		// Находим элемент с заголовком карточки
		const cardTitle = card.querySelector('.content__title');
		// Обновляем текст
		cardTitle.textContent = activity.title;

		if (card) {
			// Ищем соответствующие данные
			const current = card.querySelector('.content__current');
			const previous = card.querySelector('.content__previous');
			// Обновляем текст
			if (current) {
				current.textContent = activity.timeframes[period].current + 'Hrs';
			}
			if (previous) {
				// создаем переменную для текста периода
				let periodText = '';

				if (period === 'daily') periodText = 'Yesterday';
				if (period === 'weekly') periodText = 'Last Week';
				if (period === 'monthly') periodText = 'Last Month';

				previous.textContent = periodText + ' – ' + activity.timeframes[period].previous + 'Hrs';
			}
		}
	});
}

// Находим все кнопки
const buttons = document.querySelectorAll('[data-period]');
// Функция для обновления активной кнопки
function updateActiveButton(activeButton) {
	// Убираем .active у всех кнопок
	buttons.forEach(button => {
		button.classList.remove('active');
	});
	// Добавляем .active кнопке, по которой кликнули
	activeButton.classList.add('active');
};
// Для каждой кнопки
buttons.forEach(button => {
	// Добавляем обработчик клика
	button.addEventListener('click', () => {
		// Получаем период из data-атрибута
		const period = button.getAttribute('data-period');
		// Обновляем данные
		showDateForPeriod(period);
		updateActiveButton(button);
	});
});

// Функция инициализации начального состояния
function initializeApp() {
	// Показываем данные за неделю
	showDateForPeriod('weekly');
	// Активируем кнопку 'weekly'
	const weeklyButton = document.querySelector('[data-period="weekly"]');
	if (weeklyButton) {
		updateActiveButton(weeklyButton);
	}
};

// Вызываем инициализацию когда DOM загружен
document.addEventListener('DOMContentLoaded', initializeApp);