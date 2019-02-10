import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import Container from 'components/Container'
import UploadIcon from 'assets/upload.svg'
import VideoIcon from 'assets/video-player.svg'
import style from './Home.scss'

@Component({
  name: 'Home',
  styles: [style],
})
export default class Home extends Vue {
  public render(h: CreateElement): JSX.Element {
    return (
      <section class={style.root}>
        <Container>
          <header class={style.intro}>
            <h1 class={style.title}>
              Save video{' '}
              <strong class={style.strong}>for last day on earth</strong>
            </h1>
            <p class={style.lead}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              dolore quis qui! Aliquid repudiandae vero omnis, ea voluptatum
              consectetur tempora asperiores? Esse asperiores corrupti inventore
              tenetur, consectetur sint! Harum, minima.
            </p>
          </header>
          <nav class={style.nav}>
            <router-link class={style.link} to={{name: 'upload'}}>
              <UploadIcon class={style.icon} />
              <span>Upload</span>
            </router-link>
            <router-link class={style.link} to={{name: 'library'}}>
              <VideoIcon class={style.icon} />
              <span>Library</span>
            </router-link>
          </nav>
        </Container>
      </section>
    )
  }
}
