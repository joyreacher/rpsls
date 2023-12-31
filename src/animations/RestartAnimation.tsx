import React from "react"
import { gsap } from "gsap"
import Flip from "gsap/Flip";
gsap.registerPlugin(Flip)

const RestartAnimation = (name: string, color: string) => {
  let tl = gsap.timeline({ paused: true, duration: .85 })
  let button = document.querySelector(`.btn-container--${name}`)
  let opponentContainer = document.querySelector(`.opponent-container`)
  let restartContainer = document.querySelector(`.restart-container`)
  let opponentInlay = document.querySelector(`.opponent-inlay`)
  let hidden = gsap.utils.toArray('.hidden')
  let state = Flip.getState([
    button,
    '.btn',
    '.restart-container',
    '.opponent-container',
    '.opponent-inlay',
    '.board-container',
    `.btn-container--${name}`
  ])

  button.classList.toggle('initial')
  opponentContainer.classList.toggle('initial')
  opponentInlay.classList.toggle('absolute')
  restartContainer.classList.toggle('absolute')
  gsap.set([`.btn-container--${name}`, '.opponent-container'], { transform: 'scale(1)' })
  gsap.set('.underlay', { display: 'none', visibility: 'hidden', opacity: 0, transform: 'scale(0)' })
  tl
    //? RESTART CONTAINER
    .fromTo('.restart-container', { display: 'flex', opacity: 1, visibility: 'visible', top: '0' }, { top: '4em', display: 'none', opacity: 0, visibility: 'hidden' }, '<')
    //? LABELS
    .fromTo(['.player-label', '.house-label'], { display: 'block', opacity: 1, visibility: 'visible' }, { display: 'none', opacity: 0, visibility: 'hidden' }, '0')
    //? CONTAINER THAT HOLDS BOTH PLAYER ICONS
    .to(`.icon-container`, { justifyContent: 'center', width: '0vw' }, '<')
    //? OPPONENT
    .to('.opponent-container', { transform: 'scale(1)', display: 'none', visibility: 'hidden', opacity: 0 }, '0')
    .to('.opponent-inlay', { display: 'none', visibility: 'hidden', opacity: 0 }, '0')
    //? RESET PLAYER CONTAINER BACKGROUND
    .to(`.btn-container--${name}`, { duration: 1, background: `${color}`}, '<')
    .to(`.btn-overlay--${name}`, { zIndex: 0 }, '<')
    //? ITERATE THROUGH HIDDEN BUTTONS AND BOARD PENTAGON
    .fromTo([hidden, '.pentagon'],
      {
        opacity: 0, display: 'none', visibility: 'hidden', autoAlpha: 0
      },
      {
        stagger: .2, autoAlpha: 1, visibility: 'visible', opacity: 1, display: 'flex', onComplete: () => {
          gsap.to('.underlay', { display: 'none', visibility: 'hidden', opacity: 0 })
        }
      })

    .to(`.board-container`, {
      duration: .09,
      justifyContent: 'center'
    }, '0')
    .then(() => {
      hidden.map((el) => {
        el.classList.toggle('hidden')
      })
      Flip.killFlipsOf([button,
        '.opponent-container',
        '.btn',
        '.restart-container',
        '.opponent-container',
        '.opponent-inlay',
        `.btn-container--${name}`])
    }
    )


  Flip.from(state, {
    targets: '.btn',
    ease: 'power1.in',
    duration: 1
  })
  return tl
}
export default RestartAnimation 