const massaCurso = require('../fixtures/MassaAdicaoCursos.json');
const AdminSitePage = require('./Pages/AdminSitePage');
const AddNewCoursePage = require('./Pages/AddNewCoursePage');
const GerenciarCursosPage = require('./Pages/GerenciarCursosPage');

describe('Como administrador,', () => {
    
    beforeEach(() => {
        cy.session(Cypress.env('usuarioAdmin'), ()=>{
            //Dado que faço login como administrador
            cy.loginAPI(Cypress.env('usuarioAdmin'), Cypress.env('senhaPadrao'))
        })

        //Verifico se o curso já existe
        AdminSitePage.gerenciaCursos('pt_br')
        //Se existir, excluo
        GerenciarCursosPage.excluirCurso('Desafio Revvo QA')
    })

    massaCurso.forEach(({nome,abrev,categoria,id, mensagem}) => {
        context(`Desejo adicionar cursos,`, () => {
            it(`Para verificar os campos obrigatórios ${nome}, ${abrev}, ${categoria}, ${id}`, () => {
                
                //E visito a página de administração do site
                AdminSitePage.adicionaNovoCurso('pt_br')
    
                //E preencho os campos de adição de curso
                AddNewCoursePage.preencheNomeCompletoDoCurso(nome)
                AddNewCoursePage.preencheNomeCurtoDoCurso(abrev)
                AddNewCoursePage.preencheCategoriaDoCurso(categoria)
                AddNewCoursePage.preencheIdNumberDoCurso(id)
    
                AddNewCoursePage.pressionaBotaoSaveAndDisplay()
    
                //Então vejo o curso adicionado ou uma mensagem de erro
                GerenciarCursosPage.validaCursoAdicionado(nome,abrev, mensagem)
            });
        })
    });

    let marcadorObrigatorio = '*'
    let corObrigatorio = 'rgb(202, 49, 32)'
    it(`Desejo que os campos obrigatórios sejam marcados com ${marcadorObrigatorio} na cor ${corObrigatorio}`, () => {
        //E visito a página de administração do site
        AdminSitePage.adicionaNovoCurso('pt_br')

        //Então vejo as cores das marcações dos campos obrigatórios
        AddNewCoursePage.verificaSinalizadorDeCampoObrigatorio(marcadorObrigatorio, corObrigatorio)
    });
})