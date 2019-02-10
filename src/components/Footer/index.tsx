import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import Container from 'components/Container'
import style from './Footer.scss'

@Component({
  name: 'Footer',
  styles: [style],
})
export default class Footer extends Vue {
  public render(h: CreateElement): JSX.Element {
    return (
      <footer class={style.root}>
        <Container class={style.container}>
          <router-link to={{name: 'home'}} class={style.brand}>
            VOD
          </router-link>
          <p class={style.legal}>
            &copy; 2019 &middot; A StyleLab project
            <br />
            Didier Chartrain
          </p>
        </Container>
      </footer>
    )
  }
}
