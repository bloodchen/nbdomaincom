import axios from 'axios'
import { Notify } from 'quasar'


const auction_server = "https://util.nbsite.link/namecheck";
const tool_server = "https://util.nbsite.link/namecheck";
const brandReg_server = "https://tmapi.nbdomain.com";
const SURL = {
  "placeOrder": auction_server + "/order_notify",
  "signin": auction_server + "/sign_notify",
  "reg_domain": auction_server + "/register_domain",
  "reply": auction_server + "/get_reply/",
  "notify": auction_server + "/notify",
  "applyFree": auction_server + "/v1/free",
  "getID": auction_server + "/v1/getID",
  br: {
    code: brandReg_server + "/common/v1/send_vcode",
    check_code: brandReg_server + "/common/v1/check_vcode",
    check_domain: brandReg_server + "/brand/v1/check_domain",
    upload_file: brandReg_server + "/brand/v1/upload_file",
    create_order: brandReg_server + "/brand/v1/order/create",
    order_info: brandReg_server + "/brand/v1/order",
    submit_order: "https://brand1-pay.glitch.me/order"
  }
}
export const CONFIG = {
  nbNode:"https://api.nbdomain.com"
}
var tldInfo = null;
export class Updater {
  static clients = []
  static sub(client) {
    this.clients.push(client)
  }
  static async fire(event, data) {
    for (const item of this.clients) {
      await item(event, data)
    }
  }
}
async function loadScript(url) {
  return new Promise(resolve => {
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.onload = function () { resolve(true) };
    script.onerror = () => { console.error("error loading" + url); resolve(false) }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  })
}
export class tools {
  static ax = null;
  static async inst() {
    if (this.inited) return tools
    this.inited = true
    console.log("tool init");
    const res = await axios.get("./site_config.json");
    const json = res.data;
    console.log("site_config:", json);
    this.siteConfig = json;

    this.dpay = new dPay.WalletApp()
    const nbnode = CONFIG.nbNode
    this.dpay.init({ appid: "app1.nbdomain.a", bridge: nbnode, debug: true })

    await nblib.init({
      nbNode: this.siteConfig.nbNode ? this.siteConfig.nbNode : nbnode,
      dpay: this.dpay,
      enable_write: true,
      debug: true
    });
    const cf = window.coinfly
    tools.arLib = await cf.create('ar')
    tools.bsvLib = await cf.create('bsv')
    tools.nblib = nblib;
    console.log("end tool init nblib:");
    return tools
  }
  static async addEmailToList(email, list) {
    if (!email || !list || email == "" || list == "") return;
    const url = "https://tmapi.nbdomain.com/email-list/v1/add_email?email=" + email + "&list=" + list;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      return { code: -1, msg: "server error:" + e.message }
    }
  }
  static async removeEmailFromList(email, list) {
    const url = "https://tmapi.nbdomain.com/email-list/v1/remove_email?email=" + email + "&list=" + list;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      return { code: -1, msg: "server error:" + e.message }
    }
  }
  static async connectWallet() {
    if (!(await tools.dpay.isConnected())) {
      const res = await tools.dpay.connect({ permissions: { access: ['ACCESS_ADDRESS', 'SIGN_TRANSACTION'], chains: ['ar', 'bsv'] } });
      if (res.code != 0) {
        console.error(res)
      }
    }
  }
  static async callPayAction(payCmd) {
    console.log(payCmd)
    if (!(await tools.dpay.isConnected())) {
      //await tools.dpay.connect({ permissions: { chains: ['ar', 'bsv'] } });
      Notify.create({ message: 'Please connect wallet first', position: 'center', color: "warning" })
      return
    }
    async function handleReply(res, para) {
      console.log("got reply:", res)
      if (payCmd.callback) await payCmd.callback(res, para)
    }
    const cmd = payCmd;
    console.log("cmd=", payCmd);
    if (cmd.cmd == "key") {
      const domain = await tools.nblib.getDomain(cmd.domain);
      if (domain) {
        const res = await domain.updateKey({ kv: cmd.kv })
        console.log("key cmd result:", res);
        await handleReply(res);
      }
    }
    if (cmd.cmd == "user") {
      const domain = await tools.nblib.getDomain(cmd.domain);
      if (domain) {
        const res = await domain.updateUser({
          name: cmd.kv.name,
          publicKey: cmd.kv.publicKey,
        });
        console.log("user cmd result:", res);
        await handleReply(res);
      }
    }
    if (cmd.cmd == "sell") {
      const domain = await tools.nblib.getDomain(cmd.domain);
      if (domain) {
        const res = await domain.sell(cmd.sell_info);
        console.log("sell cmd result:", res);
        await handleReply(res);
      }
    }
    if (cmd.cmd == "buy") {
      const buyOption = cmd.option;
      const domain = await tools.nblib.getDomain(cmd.domain);
      if (domain) {
        const res = await domain.buy(buyOption);
        console.log("buy cmd result:", res);
        await handleReply(res);
      }
    }
    if (cmd.cmd == "reg") {
      const res = await tools.nblib.registerDomain(cmd.domain);
      await handleReply(res);
    }
    if (cmd.cmd == "pay") {
      this.opay.pay(cmd, async (ret) => {
        await handleReply(ret);
        return false;
      });
    }
    if (cmd.cmd == "makePublic") {
      const domain = await tools.nblib.getDomain(cmd.domain);
      if (domain) {
        const res = await domain.makePublic(cmd.domain);
        console.log("makePublic result:", res);
        await handleReply(res);
      } else {
        console.error("Failed to get domain:", cmd.domain);
      }
    }

    if (cmd.cmd == "sign") {
      const res = await this.dpay.signMessage({ message: cmd.message, address: cmd.address, chain: cmd.chain })
      await handleReply(res, cmd.para)
    }
  }
  static async getTLDInfo() {
    if (tldInfo) return tldInfo;
    tldInfo = await nblib.getTLDinfo();
    return tldInfo;
  }
  static sendACK(url, str) {
    try {
      const fullurl = url + "?ack=" + encodeURIComponent(str);
      console.log("sending ack to:" + fullurl);
      this.ax.get(fullurl);
    } catch (e) {
      console.log("Error Send ACK", e);
    }
  }
  static async verify(data, strSig, strPubKey, chain) {
    console.log("tools.verify")
    let lib = tools.bsvLib
    if (chain === 'ar') {
      lib = tools.arLib
      console.log('use ar lib')
    }
    return await lib.verifyMessage(strPubKey, data, strSig)

  }
  static timespan(seconds) {
    const hour = Math.trunc(seconds / 60 / 60);
    const min = Math.trunc((seconds - hour * 60 * 60) / 60);
    const sec = Math.trunc(seconds - hour * 60 * 60 - min * 60);
    const s = (hour == 0 ? "" : hour + " H ") + (min == 0 ? "" : min + " M ") + sec + " S";
    return s;
  }
  static setKV(key, value) {
    if (!tools.store) tools.store = {};
    localStorage.setItem(key, JSON.stringify(value))
    tools.store[key] = value;
    //console.log(tools.store);
  }
  static getKV(key) {
    if (!tools.store) tools.store = {};
    let value = tools.store[key];
    if (value) return value
    value = localStorage.getItem(key)
    if (value) return JSON.parse(value)
    return {}
  }

  static getConfig(tld) {
    return config[tld];
  }

  static async getExchangeRate() {
    const res = await axios.get("https://api.whatsonchain.com/v1/bsv/main/exchangerate");
    const json = res.data;
    return json;
  }
  static async new_domains() {
    const url = tool_server + "/new_domain";
    const res = await axios.get(url);
    return res.data;
  }
  static async getFreeDomains() {
    let res = await axios.get(SURL.free);
    return res.data;
  }
  static async get_news(lan) {
    let url = tool_server + "/news";
    if (lan) url += "?lan=" + lan;
    const res = await axios.get(url);
    return res.data;
  }
  static async search_domain(nid) {
    let url = tool_server + "/search_domain?nid=" + nid;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.error(e.message)
      return { ar: [], bsv: [] }
    }
  }

  static validate_domain(domain) {
    if (domain != "" && domain != null) {
      let dot = domain.lastIndexOf('.');
      let ext = domain.slice(dot);
      return nblib.validate(domain);
    }
    return false;
  }
  static async get_domain(domain, full = false) {
    return await nblib.readDomain(domain, full);
  }
  static async get_domains_by_address(address) {
    const res = await nblib.domainFromAddress(address);
    return res;
  }
  static async get_onSale() {
    const res = await nblib.getOnSale();
    return res;
  }
  static randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


}
