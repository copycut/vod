import Vue, {CreateElement} from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {AuthManager} from '@azure/ms-rest-browserauth'
import {Props} from 'router/hooks/Root'
import Header from 'components/Header'
import Footer from 'components/Footer'
import minireset from 'minireset.css'
import style from './Root.scss'

@Component({
  name: 'Root',
  styles: [minireset, style],
})
export default class Root extends Vue implements Props {
  @Prop({type: String})
  public readonly routePath: string

  @Prop({type: Boolean})
  public readonly isTouchDevice: boolean

  private authManager: AuthManager

  public async mounted(): Promise<void> {
    const html =
      window.document.documentElement ||
      window.document.getElementsByTagName('html')[0]
    html.classList.toggle('no-touch', !this.isTouchDevice)

    this.authManager = new AuthManager({
      clientId: 'da297eed-a8a0-42e4-85a5-49b7be2b0aeb',
      tenant: '06747ae6-727d-47dc-9b05-88faa77b84f8',
    })

    const result = await this.authManager.finalizeLogin()
    if (result.isLoggedIn) {
      //
    }
  }

  private async msLogin(): Promise<void> {
    this.authManager.login()
  }

  public render(h: CreateElement): JSX.Element {
    return (
      <div id="app" class={style.app}>
        <Header />
        <div class={style.content}>
          <button on-click={this.msLogin}>Login</button>
          <router-view key={this.routePath} />
        </div>
        <Footer />
      </div>
    )
  }
}
