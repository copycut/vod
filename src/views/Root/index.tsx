import Vue, {CreateElement} from 'vue'
import {Component, Prop} from 'vue-property-decorator'
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

  public mounted(): void {
    const html =
      window.document.documentElement ||
      window.document.getElementsByTagName('html')[0]
    html.classList.toggle('no-touch', !this.isTouchDevice)
  }

  public render(h: CreateElement): JSX.Element {
    return (
      <div id="app" class={style.app}>
        <Header />
        <div class={style.content}>
          <router-view key={this.routePath} />
        </div>
        <Footer />
      </div>
    )
  }
}
