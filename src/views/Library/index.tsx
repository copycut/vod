import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import Container from 'components/Container'
import Video from 'components/Video'
import videos from './videos.json'
import style from './Library.scss'

interface VideoType {
  sources: string[]
  title: string
  subtitle: string
  description: string
  thumb: string
}

@Component({
  name: 'Library',
  styles: [style],
})
export default class Library extends Vue {
  public render(h: CreateElement): JSX.Element {
    return (
      <section class={style.root}>
        <Container class={style.container}>
          <h1 class={style.title}>Library</h1>
          <div class={style.gallery}>
            {videos.map((video: VideoType) => (
              <Video
                class={style.video}
                source={video.sources[0]}
                title={video.title}
                subtitle={video.subtitle}
                thumb={video.thumb}
              />
            ))}
          </div>
        </Container>
      </section>
    )
  }
}
