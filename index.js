const axios = require('axios');
const getMAC = require('getmac');
const fs = require("fs");
var colors = require("colors");
const puppeteer = require("puppeteer");
const prompt = require('prompt-sync')();
var element;
var text;
var Cont;
var IDMaquina;
var Proxy = "";
const VerMod = 15;
var ProxyRG;
var ProxySRV;
var NavAberto = false;
var Consulta;
var page;
var page2;
var browser;
var browser2;
var email;
var UsarProxy = false;
var IP;

exports.sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

exports.SetProxy = async function (rProxy, rProxyRG, rProxySRV) {
    Proxy = rProxy;
    ProxyRG = rProxyRG;
    ProxySRV = rProxySRV;
    return true;}


    IDMaquina = ID;
    if (IDMaquina == "NjQ4OTFB") { //Coder
        UsarProxy = true;
    } else if (IDMaquina == "OEFGODAy") { //6638
        UsarProxy = true; //t
    } else if (IDMaquina == "NzREQkIz") { //8040
        UsarProxy = true;
    } else if (IDMaquina == "MkIyMDA3") { //446
        UsarProxy = true;
    } else if (IDMaquina == "M0Y3QzJB") { //0881
        UsarProxy = true; //t
    } else if (IDMaquina == "RDc0RjBG") {
        UsarProxy = true;
    } else if (IDMaquina == "NTQ1NDMy") { // 7620
        UsarProxy = true; //t
    } else if (IDMaquina == "MjAzMTAy") { // 4436
        UsarProxy = true; //t
    } else {
        console.log(`MÃ¡quina ${IDMaquina} nÃ£o autorizada`)
        await SalvaLogSRV("NÃ£o autorizada");
        return process.exit(1);
    }
    await console.log(`MÃ³dulo vs ${VerMod} configurado para mÃ¡quina ${IDMaquina}`);
    if (UsarProxy) {
        var resposta;
        resposta = prompt("Iniciar com proxy? [S] para SIM [N] para nÃ£o >  ");
        if (resposta === "S" || resposta === "s") {
        } else if (resposta === "N" || resposta === "n") {
            UsarProxy = false;
        } else {
            console.log("Resposta invÃ¡lida. Por favor, responda com 'S' ou 'N'.");
            return process.exit(1);
        }
    }
    if (UsarProxy) {
        var ConfigServ = false;
        try {
            await axios.get(`https://tq.lunaproxy.com/getflowip?neek=1099853&num=1&type=1&sep=1&regions=all&ip_si=1&level=1&sb=`)
                .then(async res => {
                    if (res.data.msg.includes("Allowlist verification failed")) {
                        ConfigServ = await LiberaIPProxy();
                    } else if (res.data.includes(":")) {
                        ConfigServ = true;
                    }
                    if (ConfigServ == false) {
                        console.log(colors.white.bgRed("ERRO AO CONFIGURAR SERVIDOR PROXY"));
                        return process.exit(1);
                    }
                    await SalvaLogSRV("Inicio - Proxy: " + UsarProxy);
                })
                .catch(err => {
                    //console.log('Error: ', err.message);
                });
        } catch (error2) {
            //console.log(error2);
        }

    }

}

async function LiberaIPProxy() {
    try {
        await axios.get(`https://gapi.lunaproxy.com/index/index/save_allowlist?neek=1099853&appkey=c3b451f405365d66a56b62c98cf5683f&white=${IP}`)
            .then(async res => {
                if (res.data.msg == "success") {
                    await console.log(colors.white.bgCyan("CONFIGURANDO SERVIDOR PROXY"));
                    await sleep(30000);
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                return false;
                //console.log('Error: ', err.message);
            });
    } catch (error2) {
        return false;
        //console.log(error2);

    }
}

exports.ConfigProxy = async function () {
    console.log(colors.white.bgCyan("SEU IP " + IP));
    if (UsarProxy) {
        console.log(colors.white.bgCyan("SERVIDOR PROXY CONFIGURADO"));
        return true;
    } else {
        console.log(colors.white.bgCyan("-- PROXY DESATIVADA --"));
        return true;
    }

            })
            .catch(err => {
                return false;
                //console.log('Error: ', err.message);
            });
    } catch (error2) {
        return false;
        //console.log(error2);

    }
}

async function AbreNav() {
    try {
        if (NavAberto == false) {
            browser = await puppeteer.launch(
                {
                    headless: 'new',
                    product: 'chrome',
                    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                    //executablePath: 'C:/Program Files/Firefox Developer Edition/firefox.exe',
                    //userDataDir: './cookies/tmp' + randomnumb,
                    ignoreHTTPSErrors: true,
                    args: [
                        "--no-sandbox",
                        '--incognito',
                    ]
                }
            );
            if (UsarProxy) {
                browser2 = await puppeteer.launch(
                    {
                        headless: 'new',
                        product: 'chrome',
                        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                        //executablePath: 'C:/Program Files/Firefox Developer Edition/firefox.exe',
                        //userDataDir: './cookies/tmp' + randomnumb,
                        ignoreHTTPSErrors: true,
                        args: [
                            `--proxy-server=${Proxy}`,
                            "--no-sandbox",
                            '--incognito',
                        ]
                    }
                );
            } else {
                browser2 = await puppeteer.launch(
                    {
                        headless: 'new',
                        product: 'chrome',
                        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                        //executablePath: 'C:/Program Files/Firefox Developer Edition/firefox.exe',
                        //userDataDir: './cookies/tmp' + randomnumb,
                        ignoreHTTPSErrors: true,
                        args: [
                            //`--proxy-server=${Proxy}`,
                            "--no-sandbox",
                            '--incognito',
                        ]
                    }
                );
            }

        }
        NavAberto = true;
        return true;
    } catch (error) {
        return false;
    }
}

async function SetPages() {
    try {
        const pages = await browser.pages();
        page = pages[0];
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                request.abort();
            else if (request.url().endsWith('.css')) {
                request.abort();
            }
            else if (request.url().endsWith('.woff2')) {
                request.abort();
            }
            else if (request.url().endsWith('.svg')) {
                request.abort();
            }
            else if (request.url().endsWith('.png')) {
                request.abort();
            }
            else if (request.url().endsWith('.jpg')) {
                request.abort();
            }
            else if (request.url().endsWith('.jpeg')) {
                request.abort();
            }
            else if (request.url().endsWith('.txt')) {
                request.abort();
            }
            else
                request.continue();
        });
        page.on('framedetached', (frame) => {
            //console.log('Frame detached1: ' + frame.name());
        });
        await page.setDefaultNavigationTimeout(25000);

        //page2 = await browser.newPage();
        const pages2 = await browser2.pages();
        page2 = pages2[0];

        await page2.setRequestInterception(true);
        page2.on('request', request => {
            if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet')
                request.abort();
            else if (request.url().endsWith('.css')) {
                request.abort();
            }
            else if (request.url().endsWith('.woff2')) {
                request.abort();
            }
            else if (request.url().endsWith('.svg')) {
                request.abort();
            }
            else if (request.url().endsWith('.png')) {
                request.abort();
            }
            else if (request.url().endsWith('.jpg')) {
                request.abort();
            }
            else if (request.url().endsWith('.jpeg')) {
                request.abort();
            }
            else if (request.url().endsWith('.txt')) {
                request.abort();
            }
            else
                request.continue();
        });
        page2.on('framedetached', (frame) => {
            //console.log('Frame detached2: ' + frame.name());
        });
        if (UsarProxy) {
            await page2.setDefaultNavigationTimeout(60000);
        } else {
            await page2.setDefaultNavigationTimeout(40000);
        }
        return true;
    } catch (error) {
        return false;
    }

}

async function FechaNav() {
    try {
        if (NavAberto) {
            await sleep(100);
            await browser.close();
        }
        try {
            if (NavAberto) {
                await sleep(100);
                await browser2.close();
                await sleep(100);
            }
            NavAberto = false;
            return true;
        } catch (error) {
            return false;
        }
    } catch (error) {
        return false;
    }
}

async function SetProxy() {
    try {
        Proxy = "";
        await axios.get(`https://api.coderzerotreze.cloud/?tp=proxy&vl=&id=${IDMaquina}`)
            .then(async res => {
                //var ListaTelefones = res.data.telefones
                Proxy = res.data.ip + ":" + res.data.port;
                ProxyRG = res.data.rg;
                ProxySRV = res.data.srv;
                return true;
            })
            .catch(err => {
                //console.log('Error: ', err.message);
                return false;
            });
    } catch (error2) {
        return false;
    }
    if (Proxy != "" && Proxy != undefined) {
        console.log(colors.bgMagenta.white("Proxy: " + Proxy + " RG: " + ProxyRG + " SRV: " + ProxySRV));
        return true;
    } else {
        return false;
    }
}

async function ConsultaCPF(CPF) {
    try {
        Consulta = undefined;
        console.log(colors.bgWhite.black("CPF: " + CPF))
        await axios.get(`https://api.coderzerotreze.cloud/?tp=cpf&vl=${CPF}&id=${IDMaquina}`)
            .then(async res => {
                Consulta = res.data;
                if (Consulta == undefined || Consulta == "") {
                    return false;
                } else {
                    return true;
                }
            })
            .catch(err => {
                Consulta = undefined;
                return false;
                //console.log('Error: ', err.message);
            });
    } catch (error2) {
        return false;
    }
    if (Consulta == undefined || Consulta == "") {
        return false;
    } else {
        return true;
    }
}

async function SetEmail() {
    try {
        var Tent = true;
        try {
            await page.goto("https://www.invertexto.com/gerador-email-temporario");
            Tent = true;
            while (Tent) {
                try {
                    await sleep(500);
                    element = await page.$("#email-input");
                    email = await page.evaluate(element => element.value, element);
                    console.log(colors.bgWhite.blue("Email: " + email));
                    Tent = false;
                } catch (error) {
                }
            }

            element = await page.$("body > main > div.container > div.maillist > div.empty");
            text = await page.evaluate(element => element.textContent, element);
            return true;
        } catch (error) {
            return false;
        }
    } catch (error) {
        return false;
    }
}
function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    //console.log(strCPF)
    if (strCPF == "") return false;
    if (strCPF == undefined) return false;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

exports.loginNubank = async function (CPF) {
    try {
        CPF = CPF.trim();
        if (CPF != "" && CPF != undefined) {
            if (TestaCPF(CPF)) {
                Consulta = undefined;
                if (UsarProxy) {
                    if (await SetProxy() != true) {
                        await SalvaInfo("alert", `${CPF}`, "|Erro ao Solicitar Proxy", 2);
                        return false;
                    }
                }
                if (await ConsultaCPF(CPF) != true) {
                    await SalvaInfo("alert", `${CPF}`, `|Erro ao Consultar CPF: ${CPF}`, 2);
                    return false;
                }
                if (await FechaNav() != true) {
                    await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, `|Erro ao fechar navegador`, 2);
                    return false;
                }
                if (await AbreNav() != true) {
                    await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, `|Erro ao abrir navegador`, 2);
                    return false;
                }
                if (await SetPages() != true) {
                    await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, `|Erro ao configurar as paginas`, 2);
                    return false;
                }
                if (await SetEmail() != true) {
                    await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, `|Erro ao solicitar email`, 2);
                    return false;
                }
                try {
                    await page2.goto('https://nubank.com.br/');
                    //await sleep(10000);
                    await page2.type("#field-cpf", CPF);
                    await sleep(100);
                    try {
                        await page2.click('#short-form > div.sc-ksNGjt.gDytHF > button');
                    } catch (error) {

                    }
                    await sleep(1000);
                    try {
                        await page2.click('#short-form > div.sc-ksNGjt.gDytHF > button');
                    } catch (error) {

                    }
                    await sleep(1000);
                    await page2.type("#field-name", Consulta.DadosBasicos.nome);
                    await page2.type("#field-phone", '119' + getRandomInt(1000, 9999) + getRandomInt(1000, 9999));
                    await page2.type("#field-email", email);
                    await page2.type("#field-emailConfirmation", email);
                    await page2.click('#label-accepted > span.sc-bYWUiG.gaLLqc > svg');
                    await sleep(3000);
                } catch (error) {
                    await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, `|Erro ao acessar a pagina Nubank`, 2);
                    await sleep(2000);
                    return false;
                }

                try {
                    await page2.click('#complete-form-drawer > div > div > div.sc-kxtUkE.jKEmYc > form > div > div.sc-dsKijY.dTZaxR > div > button');
                    await sleep(5000);
                    console.log(colors.bgWhite.gray("Aguardando retorno..."));
                    Tent = true;
                    var VerifEmail = true;
                    var ContTent = 16;
                    while (Tent && ContTent > 0) {
                        ContTent--;
                        //console.log("Ret - " + ContTent)
                        try {
                            await sleep(1000);
                            Cont = await page2.content();
                            //console.log("lerndo:" + Cont);
                            if (Cont.includes("Aprovamos") && text.includes("crÃ©dito") == true && text.includes("conta") == true && text.includes("construir") == false) {
                                VerifEmail = false;
                                Tent = false
                                await SalvaInfo("live", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 1);
                            } else if (Cont.includes(email) && Cont.includes(Consulta.DadosBasicos.nome) == false) {
                                VerifEmail = false;
                                Tent = false
                                await SalvaInfo("die", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 3);
                            } else if (Cont.includes(email) && Cont.includes(Consulta.DadosBasicos.nome)) {
                                try {
                                    await page2.click('#complete-form-drawer > div > div > div.sc-kxtUkE.jKEmYc > form > div > div.sc-dsKijY.dTZaxR > div > button');
                                    await sleep(1000);
                                    if (ContTent == 0) {
                                        //await SalvaInfo("alert", `${CPF}|${Consulta.DadosBasicos.nome}`, 2);
                                        Tent = false;
                                    }
                                } catch (error) {
                                }
                            } else {
                                try {
                                    await sleep(1000);
                                    text = await page.content();
                                    text = text.split(`<tbody>`)[1].split(`</tbody>`)[0].split(`<td>`)[2].split(`</td>`)[0];
                                    if (text.includes("crÃ©dito") == true && text.includes("conta") == true && text.includes("construir") == false) {
                                        await SalvaInfo("live", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 1);
                                        Tent = false;
                                        VerifEmail = false;
                                    } else {
                                        console.log((text));
                                    }
                                } catch (error) {
                                }
                            }
                        } catch (error) {
                            //await sleep(1000);
                            if (ContTent == 0) {
                                await SalvaInfo("erro1", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 2);
                                Tent = false;
                            }
                        }

                    }
                    //console.log(Cont);
                    Tent = VerifEmail;
                    ContTent = 6;
                    if (Tent) {
                        console.log(colors.bgWhite.gray("Verficando e-mail..."));
                    }
                    while (Tent == true && ContTent > 0) {
                        ContTent--;
                        //console.log("Email - " + ContTent)
                        try {
                            await sleep(2000);
                            text = await page.content();
                            text = text.split(`<tbody>`)[1].split(`</tbody>`)[0].split(`<td>`)[2].split(`</td>`)[0];
                            console.log((text));
                            if (text.includes("crÃ©dito") == true && text.includes("conta") == true && text.includes("construir") == false) {
                                Tent = false
                                await SalvaInfo("live", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 1);
                            } else {
                                await SalvaInfo("die", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 3);
                                Tent = false;
                            }
                            Tent = false;
                        } catch (error) {
                            if (ContTent == 0) {
                                try {
                                    Cont = await page2.content();
                                    //console.log("lerndo:" + Cont);
                                    if (text.includes("aprovamos") == true && text.includes("crÃ©dito") == true && text.includes("conta") == true && text.includes("construir") == false) {
                                        Tent = false
                                        await SalvaInfo("live", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 1);
                                    } else {
                                        await SalvaInfo("die", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 3);
                                        Tent = false;
                                    }
                                } catch (error) {
                                    await SalvaInfo("die", `${CPF}|${Consulta.DadosBasicos.nome}`, "", 3);
                                    Tent = false;
                                }

                            }
                        }
                    }

                } catch (error) {
                }
            } else {
                await SalvaInfo("inv", `${CPF}`, "", 3);
            }

        } else {
            return true;
        }

    } catch (error) {
        await SalvaInfo("erro", `${CPF}|${error}`, "", 3);
        return false;
    }
    /*try {
        await page.close();
    } catch (error) {
    }
    try {
        await page2.close();
    } catch (error) {
    }*/
};


const callMac = () => {
    return getMAC.default();
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function SalvaInfo(Arq, Texto, Ret, res) {
    try {
        if (res == 1) {
            console.log(colors.green.bgWhite(`${Arq} --> ${Texto}${Ret}`));
        } else if (res == 2) {
            console.log(colors.white.bgYellow(`${Arq} --> ${Texto}${Ret}`));
        } else if (res == 3) {
            console.log(colors.red.bgWhite(`${Arq} --> ${Texto}${Ret}`));
        }
        if (Ret != "") {
            await SalvaLogSRV(`${Arq} --> ${Ret.replaceAll("|", "")}`);
        } else {
            await SalvaLogSRV(`${Arq}`);
        }

        fs.appendFileSync(`${Arq.trim()}.txt`, `${Texto}${Ret}\n`);
    } catch (error) {
        console.log(colors.red.bgBlack(`Erro ao salvar info`));
    }
}
