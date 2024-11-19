before(() => {
  cy.exec('npx tailwindcss -i ./src/index.css -m').then(({ stdout }) => {
    if (!document.head.querySelector('#tailwind-style')) {
      const link = document.createElement('style')
      link.id = 'tailwind-style'
      link.innerHTML = stdout

      document.head.appendChild(link)
    }
  })
})

//This will be used in component testing to load tailwind styles.
// https://stackoverflow.com/questions/70306004/running-cypress-tests-with-tailwindcss-3
