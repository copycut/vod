import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import Container from 'components/Container'
import style from './Header.scss'

@Component({
  name: 'Header',
  styles: [style],
})
export default class Header extends Vue {
  public render(h: CreateElement): JSX.Element {
    return (
      <header class={style.root}>
        <Container class={style.container}>
          <router-link class={style.brand} to={{name: 'home'}}>
            VOD
          </router-link>
          <nav class={style.nav}>
            <router-link
              class={style.link}
              active-class={style.active}
              to={{name: 'upload'}}
            >
              Upload
            </router-link>
            <router-link
              class={style.link}
              active-class={style.active}
              to={{name: 'library'}}
            >
              Library
            </router-link>
          </nav>
        </Container>
      </header>
    )
  }
}
