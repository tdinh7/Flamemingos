<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="WordJumble.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .header {
            text-align: center;
            font-family: sans-serif;
            font-weight: 200;
            color: #800080;
            border-style: solid;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="header">
            Flamingos Rock! Yeah! <br/>
            Word Jumble Project
        </div>
        <asp:Label ID="Label1" runat="server" Text="Label">hi</asp:Label>

        <br />
        <div >
            <span style="margin:auto">
                     <asp:Button  ID="btnHello" runat="server" Text="Why did Adele cross the road?" OnClick="btnHello_Click" class="header"/>
            </span>
        </div>
    </form>
</body>
</html>
