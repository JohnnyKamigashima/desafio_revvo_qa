const LoginPage = require( './Pages/LoginPage.js')
const AdminSitePage = require( './Pages/AdminSitePage.js')
const massaUsuarios = require('../fixtures/MassaLogin.json')

describe('Como usuário,', () => {
    context('Desejo fazer login', () => {
        beforeEach(() => {
            cy.clearCookies()
        })
            massaUsuarios.forEach(({usuario, senha, lembrar, mensagemPT, mensagemEN}) => {
                it(`Para validar se o usuário ${usuario} e ${senha} com checkbox ${lembrar} obtenha resultado ${mensagemPT}.`, () => {
                    //Dado que visito a página de login
                    LoginPage.visitaLogin()
                    
                    // Quando preencho os dados de login
                    LoginPage.preencheUsuario(usuario)
                    LoginPage.preencheSenha(senha)
                    LoginPage.selecionaLembrarUsuario(lembrar)

                    // E clico no botão de login
                    LoginPage.pressionaBotaoLogin()
                    
                    //Então sou redirecionado para a página de administração do site ou recebo mensagem de erro
                    AdminSitePage.verificaLogin(mensagemPT,mensagemEN)
                });
            })
        it('Para validar que a página de login tenha as cores do requisito RNF 001', () => {
            let rnf001 = {
                'fundoBranco': 'rgb(255, 255, 255)',
                'botaoAzul': 'rgb(0, 135, 188)',
                'botaoCinza': 'rgb(206, 212, 218)',
            }
            //Dado que visito a página de login
            cy.visit('/login')

            //Quando visualizo a tela
            //Então vejo um fundo branco RGB(255,255,255)
            LoginPage.verificaCordeFundo(rnf001.fundoBranco)

            // E um botão azul RGB (0,135,188) com o texto "Acessar" em branco
            LoginPage.verificaCorDoBotaoLogin(rnf001.botaoAzul)

            // E os botões cinza RGB (206,212,218) com o texto "Acessar como visitante" e “Criar uma conta" em preto
            LoginPage.verificaCorDoBotaoVisitante(rnf001.botaoCinza)
            LoginPage.verificarCorDoBotaoCriarConta(rnf001.botaoCinza)
        })
    })
})