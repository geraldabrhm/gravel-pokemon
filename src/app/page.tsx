export default function Home() {

  return (
    <>
      <div className="overflow-hidden">
        <video autoPlay loop muted disablePictureInPicture className="my-[-3rem] h-full">
          <source src="/videos/pokemon.mp4" type="video/mp4"/>
        </video> 
      </div>
    </>
  )
}
