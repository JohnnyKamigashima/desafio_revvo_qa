const AdminSitePage = require("./Pages/AdminSitePage");

describe('Como administrador,', () => {
    let idiomas = [
        {
            'idioma':'Português - Brasil ‎(pt_br)‎',
            'abreviacao':'pt_br'
        },
        {
            'idioma':'English ‎(en)‎',
            'abreviacao':'en'
        }
    ]
    beforeEach(() => {
        //Dado que visito a página de login
        //E faço login com o usuário admin
        cy.loginAPI(Cypress.env('usuarioAdmin'), Cypress.env('senhaPadrao'))
        cy.visit('/my')
    })

    context('Desejo poder mudar o idioma', () => {
        idiomas.forEach(({idioma, abreviacao})=>{
            it(`Para ${idioma} `, () => {
                //Quando seleciono o idioma 
                AdminSitePage.selecionaIdioma(idioma)
        
                //Então verifico se o idioma foi alterado
                AdminSitePage.verificaIdiomadoSite(abreviacao)
              })
        });
    })
})