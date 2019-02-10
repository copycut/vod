import Vue, {CreateElement} from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import style from './Video.scss'

@Component({
  name: 'Video',
  styles: [style],
})
export default class Video extends Vue {
  @Prop({type: String, required: true})
  private readonly source: string

  @Prop({type: String, required: true})
  private readonly title: string

  @Prop({type: String, required: true})
  private readonly subtitle: string

  public render(h: CreateElement): JSX.Element {
    return (
      <div class={style.root}>
        <div class={style.video}>
          <div class={style.innerVideo}>
            <video class={style.htmlVideoElement} controls>
              <source src={this.source} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          </div>
        </div>
        <div class={style.title}>{this.title}</div>
        <div class={style.subtitle}>{this.subtitle}</div>
      </div>
    )
  }
}
