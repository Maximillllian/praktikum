function removeHiddenElements(element) {
  const hiddenElements = element.querySelectorAll('.hidden')
  hiddenElements.forEach((el) => {
    el.classList.remove('hidden')
  })
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
        if (classes.contains('radio__control')) {
          targetQuiz = target.parentNode.parentNode.parentNode
        } else if (classes.contains('radio')) {
          targetQuiz = target.parentNode.parentNode
        } else if (classes.contains('radio__label')) {
          targetQuiz = target.parentNode.parentNode.parentNode
        }
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
