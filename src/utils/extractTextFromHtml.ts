export function extractTextFromHTML(html: string): string {
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    let text = '';
    tempDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as Element;
        if (elementNode.nodeName.toLowerCase() === 'br') {
          text += ' '; // <br> 태그를 공백 문자로 처리
        } else {
          text += extractTextFromHTML(elementNode.innerHTML); // 재귀적으로 하위 HTML 요소 처리
          if (elementNode.nodeName.toLowerCase() === 'p') {
            text += ' '; // <p> 태그를 만나면 한 칸 띄어쓰기 처리
          }
        }
      }
    });

    return text;
  } catch (error) {
    console.error('Error processing HTML:', error);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
}
