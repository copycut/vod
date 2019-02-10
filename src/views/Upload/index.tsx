import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import Container from 'components/Container'
import UploadIcon from 'assets/upload.svg'
import style from './Upload.scss'

@Component({
  name: 'Upload',
  styles: [style],
})
export default class Upload extends Vue {
  public render(h: CreateElement): JSX.Element {
    return (
      <section class={style.root}>
        <Container class={style.container}>
          <h1 class={style.title}>
            Upload video{' '}
            <strong class={style.strong}>before it's too late</strong>
          </h1>

          <form class={style.dropzone} action="/upload/file">
            <UploadIcon class={style.icon} />
            <h2 class={style.subTitle}>Drop files here</h2>
            <input class={style.hiddenInput} type="file" />
          </form>
        </Container>
      </section>
    )
  }
}
