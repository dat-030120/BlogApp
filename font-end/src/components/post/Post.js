import React from "react";
import "./post.css";

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://i1-vnexpress.vnecdn.net/2023/08/17/Khai-thac-mo-2550-1692262177.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=dNp27WFBWubHrp22kmVpyQ"></img>
      </div>
      <div className="text">
        <h2>Khi nào kim loại trên Trái Đất bị khai thác cạn?</h2>
        <p className="info">
          <a className="autho">Davi jons</a>
          <time>2023-01-09 16:45</time>
        </p>
        <p className="sumary">
          Thời điểm con người cạn kiệt kim loại gây tranh cãi vì phụ thuộc vào
          nhiều yếu tố như khả năng khai thác ở độ sâu lớn và tái chế. Các quá
          trình địa chất phải mất hàng nghìn, thậm chí hàng triệu năm, để tạo
          nên các mỏ khoáng sản.
          <br />
          Tuy nhiên, con người khai thác và sử dụng khoáng sản nhanh hơn mức
          chúng có thể phục hồi. Theo một số ước tính, dù vẫn còn gây tranh cãi,
          nguồn cung của một số kim loại có thể cạn kiệt trong chưa đầy 50 năm
          tới, IFL Science hôm 16/8 đưa tin.
        </p>
      </div>
    </div>
  );
}

export default Post;
