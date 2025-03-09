import Quill from 'quill';
import 'quill-mention';


const AlignStyle = Quill.import('attributors/style/align');
AlignStyle.whitelist = ['right', 'center', 'justify', 'left'];

const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = [
  '10px', '12px', '14px', '16px', '18px', '20px', 
  '24px', '28px', '32px', '36px', '40px', '44px', 
  '48px', '54px', '60px', '72px'
];

Quill.register(AlignStyle, true);
Quill.register(SizeStyle, true);

export default Quill;
