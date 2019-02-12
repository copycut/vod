import Vue, {CreateElement} from 'vue'
import {Component} from 'vue-property-decorator'
import {AuthManager} from '@azure/ms-rest-browserauth'
import {AzureMediaServices} from '@azure/arm-mediaservices'
import {
  AnonymousCredential,
  StorageURL,
  ServiceURL,
  ContainerURL,
  Aborter,
  BlobURL,
  BlockBlobURL,
} from '@azure/storage-blob'
import Container from 'components/Container'
import UploadIcon from 'assets/upload.svg'
import style from './Upload.scss'

@Component({
  name: 'Upload',
  styles: [style],
})
export default class Upload extends Vue {
  private authManager: AuthManager
  private mediaServices: AzureMediaServices

  public async mounted(): Promise<void> {
    this.authManager = new AuthManager({
      clientId: 'da297eed-a8a0-42e4-85a5-49b7be2b0aeb',
      tenant: '06747ae6-727d-47dc-9b05-88faa77b84f8',
    })

    const result = await this.authManager.finalizeLogin()
    if (result.isLoggedIn) {
      this.mediaServices = new AzureMediaServices(
        result.creds,
        '5c661926-a839-4ee6-b5e0-f5350003cfe3'
      )
    }
  }

  private async onUpload(event: Event): Promise<void> {
    event.preventDefault()

    const form = new FormData(event.currentTarget as HTMLFormElement)
    const file = form.get('video') as File

    const content = await new Promise<any>((resolve) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.readAsBinaryString(file)
    })

    const asset = await this.mediaServices.assets.createOrUpdate(
      'default-group',
      'copycut2',
      file.name,
      {storageAccountName: 'copycut'}
    )

    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 1)
    const sasResponse = await this.mediaServices.assets.listContainerSas(
      'default-group',
      'copycut2',
      asset.name!,
      {
        expiryTime: expiry,
        permissions: 'ReadWrite',
      }
    )

    console.log(sasResponse)

    const pipeline = StorageURL.newPipeline(new AnonymousCredential())
    const serviceUrl = new ServiceURL(
      sasResponse.assetContainerSasUrls![0],
      pipeline
    )
    const containerUrl = ContainerURL.fromServiceURL(
      serviceUrl,
      `newcontainer${new Date().getTime()}`
    )
    const createContainerResponse = await containerUrl.create(Aborter.none)
    console.log(
      `Create container successfully`,
      createContainerResponse.requestId
    )

    const blobName = 'newblob' + new Date().getTime()
    const blobURL = BlobURL.fromContainerURL(containerUrl, blobName)
    const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL)
    const uploadResponse = await blockBlobURL.upload(
      Aborter.none,
      content,
      file.size
    )

    console.log(uploadResponse)

    // const sasUri = new URL(sasResponse.assetContainerSasUrls![0])
    // const blobService = createBlobServiceWithSas(sasUri.host, sasUri.search)
  }

  public render(h: CreateElement): JSX.Element {
    return (
      <section class={style.root}>
        <Container class={style.container}>
          <h1 class={style.title}>
            Upload video{' '}
            <strong class={style.strong}>before it's too late</strong>
          </h1>

          <form class={style.dropzone} on-submit={this.onUpload}>
            <UploadIcon class={style.icon} />
            <h2 class={style.subTitle}>Drop files here</h2>
            <input class={style.xhiddenInput} type="file" name="video" />
            <button type="submit" />
          </form>
        </Container>
      </section>
    )
  }
}
