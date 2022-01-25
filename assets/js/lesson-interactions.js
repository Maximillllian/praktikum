function removeHiddenElements(element) {
  const hiddenElements = element.querySelectorAll('.hidden')
  hiddenElements.forEach((el) => {
    el.classList.remove('hidden')
  })
}

function createSubmitButton() {
    const submitButton = document.createElement('button')
    const vsButtonClasses = 'vs-button vs-button--null vs-button--size-null vs-button--primary vs-button--default'
    submitButton.classList.add(...vsButtonClasses.split(' '))
    // submitButton.style = '--vs-color'
    submitButton.style.setProperty('background', 'var(--royalBlue)', 'important')
    
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('vs-button__content')
    buttonDiv.style.setProperty('background', 'var(--royalBlue)', 'important')
    buttonDiv.innerText = 'Проверить'   
    submitButton.appendChild(buttonDiv)

    return submitButton
}

export function hideFeedback() {
  const quizFeedback = document.querySelectorAll('.quiz__feedback')
  quizFeedback.forEach((feedback) => {
    feedback.classList.add('hidden')
  })
}

export function reviveRadioQuiz() {
  const quizItems = document.querySelectorAll('.quiz__item')
  const quizLabels = document.querySelectorAll('.quiz__item label')

  quizItems.forEach((item) => {
    item.style.opacity = 1
    item.style.cursor = 'pointer'

    item.addEventListener(
      'click',
      (event) => {
        const target = event.srcElement
        const classes = target.classList
        let targetQuiz
        let selectedOption
        if (classes.contains('radio__control')) {
          selectedOption = target.parentNode
          targetQuiz = target.parentNode.parentNode.parentNode
        } else if (classes.contains('radio')) {
          selectedOption = target.parentNode
          targetQuiz = target.parentNode.parentNode
        } else if (classes.contains('radio__label')) {
          selectedOption = target.parentNode
          targetQuiz = target.parentNode.parentNode.parentNode
        }
        selectedOption.classList.add('checked')
        targetQuiz.classList.add('selected')
        removeHiddenElements(targetQuiz)
        //   console.log('just fucking', target.classList)
      },
      { capture: true }
    )
  })
  quizLabels.forEach((label) => {
    label.classList.remove('radio_checked')
  })
}

export function reviveCardQuiz() {
  const quizCards = document.querySelectorAll('.quiz__answer-card')
  quizCards.forEach((card) => {
    card.classList.remove(
      'quiz__answer-card_selected',
      'quiz__answer-card_correct'
    )

    const cardSVG = card.querySelectorAll('svg')
    cardSVG.forEach((svg) => svg.classList.add('hidden'))
  })

  quizCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      const quizSection = event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
      removeHiddenElements(quizSection)
    })
  })
}

export function reviveCheckboxQuiz() {
    const checkboxInputs = document.querySelectorAll('.checkbox__input')
    checkboxInputs.forEach(input => {
        input.removeAttribute('checked')
        input.removeAttribute('disabled')
    })

    // const button = createSubmitButton()
    const checkboxGroups = document.querySelectorAll('.checbox-group')
    checkboxGroups.forEach(group => {
        const button = createSubmitButton()
        group.appendChild(button)

        button.addEventListener('click', (event) => {
            const quizSection = event.target.parentNode.parentNode
            quizSection.classList.add('selected')   
            removeHiddenElements(quizSection)
        })
    })
}

export function reviveImageGallery() {
  const imageGallerySections = document.querySelectorAll('.image-gallery');
  imageGallerySections.forEach(section => {
    const sliderImages = section.querySelectorAll('.image-gallery__slider-image');
    const mainImage = section.querySelector('.image-gallery__main-image');
    sliderImages.forEach(image => {
      image.addEventListener('click', () => {
        mainImage.style.backgroundImage = `url(${image.src})`
      })
    })
  })
}

export function reviveExpanders() {
  const expander = document.querySelector('.content-expander')
  try {
    const expanderButton = expander.querySelector('button')
  // const nextSections = document.querySelectorAll('.content-expander ~ *')

  const expandedClass = 'content-expander_expanded'
  expander.classList.remove(expandedClass)
  expanderButton.innerText = 'Кликни, чтобы показать решение'
  expanderButton.classList = ''

  expanderButton.addEventListener('click', () => {
    expander.classList.add(expandedClass)
  })
  } catch (err) {
    console.log(err)
  }
}

export function reviveImageComparers() {
  const imageComparers = document.querySelectorAll('.image-comparer')
  imageComparers.forEach(comparer => {
    const firstImageBox = comparer.querySelectorAll('.split-view-sc-default__pane')[0]
    const resizer = comparer.querySelector('.split-view-sc-default__resizer');
    const leftDivide = comparer.getBoundingClientRect().left
    let isDrawing = false;

    resizer.addEventListener('mousedown', e => {
      isDrawing = true
    })

    document.addEventListener('mouseup', e => {
      isDrawing = false
    })

    comparer.addEventListener('mousemove', e => {
      if (isDrawing === true) {
        const cursorX = e.pageX - leftDivide;
        firstImageBox.style.flexBasis = cursorX / comparer.clientWidth * 100  + '%'
        console.log('Flex basis', firstImageBox.style.flexBasis)
        resizer.style.left = cursorX - (resizer.offsetWidth / 2) + 'px'
      }
    })
  })
}

export function reviveQuizeSlider() {
  const sliders = document.querySelectorAll('.slider .slider__content-scrollable-area');

  sliders.forEach(slider => {
    const quizeSections = slider.querySelectorAll('.quiz__section-list-wrapper')

    quizeSections.forEach(section => {
      const answer = section.querySelector('.quiz__section-content')
      const button = section.querySelector('.quiz__feedback-button')
  
      if (answer && button) {
        answer.style.opacity = 0
        button.addEventListener('click', () => {
          answer.style.opacity = '100%'
        })
      }
    })
  })
}