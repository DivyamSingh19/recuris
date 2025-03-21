import Spline from '@splinetool/react-spline/next';

export default function Model() {
  return (
    <main className='relative ml-96 h-screen'>
      <Spline
        scene="https://prod.spline.design/eETxwy-SR2B6ulNc/scene.splinecode" 
      />
      <div className='absolute w-40 h-40 bg-gray-100 bottom-5 right-5'></div>
    </main>
  );
}
