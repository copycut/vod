import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import style from './Container.scss'

@Component({
  name: 'Container',
  styles: [style],
})
export default class Container extends Vue {
  public render(h: CreateElement): JSX.Element {
    return <div class={style.root}>{this.$slots.default}</div>
  }
}
